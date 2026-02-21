// src/screens/TicketDetailScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StatusBar, ScrollView,
  Animated, ImageBackground, Platform, Dimensions, Image
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import * as ScreenCapture from 'expo-screen-capture';
import { COLORS, styles, width, BACKGROUND_URL, QR_SIZE, TICKETS_DATA, TM_LOGO_URL } from '../config';

// Altura fixa do paginador para que o scroll vertical externo funcione
const PAGER_HEIGHT = Dimensions.get('window').height * 0.78;
const ITEM_WIDTH = width * 0.94; // Snap interval equilibrado para o novo CARD_WIDTH

export default function TicketDetailScreen({ route, navigation }) {
  const { ticket } = route.params;
  const [qrSalt, setQrSalt] = useState(0);
  const progress = useRef(new Animated.Value(1)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  // Animação de entrada (descida simples)
  const translateY = useRef(new Animated.Value(-60)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const ticketsArray = ticket.ticketsList || Array.from({ length: ticket.ticketQuantity || 1 }, (_, i) => i);

  useFocusEffect(
    React.useCallback(() => {
      // Inicia animação de descida
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        })
      ]).start();

      if (Platform.OS === 'web') return;
      const activateProtection = async () => { await ScreenCapture.preventScreenCaptureAsync(); };
      activateProtection();
      return () => { ScreenCapture.allowScreenCaptureAsync(); };
    }, [])
  );

  const animateBar = () => {
    progress.setValue(1);
    Animated.timing(progress, { toValue: 0, duration: 15000, useNativeDriver: false }).start(({ finished }) => {
      if (finished) { setQrSalt(prev => prev + 1); animateBar(); }
    });
  };

  useEffect(() => { animateBar(); }, []);

  const barWidth = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  const renderCard = (item, index) => {
    const isObject = typeof item === 'object' && item !== null;
    const dynamicQRValue = `${(isObject ? item.qrCodeBase : ticket.qrCodeBase) || 'TICKET'}-${index + 1}-${qrSalt}`;
    const priceDisplay = isObject ? item.priceInfo : ticket.priceInfo;

    const isMeia = priceDisplay && priceDisplay.toUpperCase().includes('MEIA');
    const categoryText = isMeia ? 'MEIA-ENTRADA' : 'INTEIRA';

    return (
      <View key={index} style={{ width: ITEM_WIDTH, alignItems: 'center', paddingTop: 5 }}>
        <View style={styles.ticketCardContainer}>

          {/* BLOCO SUPERIOR: Cabeçalho Azul + QR e Infos Base */}
          <View style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff' }}>
            <View style={styles.blueHeaderContainer}>
              <ImageBackground source={{ uri: BACKGROUND_URL }} style={styles.ticketBlueTop} resizeMode="cover">
                {/* Visual agora vem diretamente do BACKGROUND_URL conforme pedido */}
                <View style={{ flex: 1 }} />

                {/* Textos da Base (Taxa e Doação) */}
                <View style={{ paddingBottom: 15, alignItems: 'center', paddingHorizontal: 25 }}>
                  <Text style={{ color: '#fff', fontSize: 6.2, fontWeight: '700', textAlign: 'center', opacity: 0.8, letterSpacing: 0.3 }}>
                    TAXA DE ADMINISTRAÇÃO · WT -30 R$ 21,74
                  </Text>
                  <Text style={{ color: '#fff', fontSize: 5.2, fontWeight: '700', textAlign: 'center', marginTop: 3, opacity: 0.8, letterSpacing: 0.1 }}>
                    DO TOTAL ARRECADADO COM A VENDA DE INGRESSOS, SERÃO DESTINADOS À DOAÇÃO R$ 25,00 POR INGRESSO DO TIPO "{categoryText}".
                  </Text>
                </View>
              </ImageBackground>

              <View style={styles.scannerStrip}>
                <Animated.View style={[styles.scannerBar, { width: barWidth }]} />
              </View>
            </View>

            <View style={styles.ticketBoxTop}>
              <View style={styles.qrSection}>
                <View style={[styles.qrContainer, { flex: 1.1 }]}>
                  <QRCode value={dynamicQRValue} size={QR_SIZE} ecl="Q" />
                </View>
                <View style={[styles.qrInfoColumn, { flex: 1 }]}>
                  <View>
                    <Text style={[styles.label, { letterSpacing: 1.2, fontSize: 7.5 }]}>SETOR</Text>
                    <Text style={styles.valueTitle}>{ticket.section}</Text>
                    <Text style={[styles.label, { letterSpacing: 1.2, fontSize: 7.5, marginTop: 4 }]}>ACESSO</Text>
                    <Text style={styles.valueTitle}>{ticket.gate}</Text>
                  </View>
                  <TouchableOpacity style={[styles.moreInfoBtn, { borderRadius: 12, paddingVertical: 12 }]}>
                    <Text style={styles.moreInfoText}>Mais informação</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* BLOCO INFERIOR: Detalhes do Ingresso */}
          <View style={styles.ticketBoxBottom}>
            <View style={styles.detailsGrid}>
              <View style={styles.gridRow}>
                <View>
                  <Text style={[styles.label, { letterSpacing: 1.2, fontSize: 7.5 }]}>TAXA</Text>
                  <Text style={styles.valueBold}>{priceDisplay}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={[styles.gridRow]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, { letterSpacing: 1.2, fontSize: 7.5 }]}>SEÇÃO</Text>
                  <Text style={styles.valueBold}>{ticket.section.toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, { letterSpacing: 1.2, fontSize: 7.5 }]}>FILEIRA</Text>
                  <Text style={styles.valueBold}>{ticket.rowInfo}</Text>
                </View>
              </View>

              <View style={[styles.gridRow, { marginTop: 22 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, { letterSpacing: 1.2, fontSize: 7.5 }]}>ABERTURA</Text>
                  <Text style={styles.valueBold}>{ticket.open}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, { letterSpacing: 1.2, fontSize: 7.5 }]}>INÍCIO</Text>
                  <Text style={styles.valueBold}>{ticket.start}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, alignItems: Platform.OS === 'web' ? 'center' : 'stretch' }}>
      <View style={{ flex: 1, width: Platform.OS === 'web' ? width : '100%' }}>
        <StatusBar barStyle="light-content" backgroundColor="#121618" />

        {/* NavBar fixa */}
        <View style={styles.detailNavBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
            <Ionicons name="chevron-back" size={26} color="#bbb" />
          </TouchableOpacity>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={styles.navTitle} numberOfLines={1}>{ticket.eventTitle}</Text>
            <Text style={styles.navSub} numberOfLines={1}>{ticket.subTitle}</Text>
          </View>
        </View>

        {/* EFEITO DE ENTRADA (DESCIDA) */}
        <Animated.View style={{ flex: 1, opacity: opacityAnim, transform: [{ translateY }] }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={true}
            alwaysBounceVertical={true}
            overScrollMode="always"
            contentContainerStyle={{
              paddingTop: 12,
              paddingBottom: 60,
              minHeight: PAGER_HEIGHT + 120
            }}
          >
            {/* Paginador HORIZONTAL entre ingressos */}
            <ScrollView
              horizontal
              pagingEnabled={false}
              snapToInterval={ITEM_WIDTH}
              snapToAlignment="start"
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / ITEM_WIDTH);
                setActiveIndex(index);
              }}
              scrollEventThrottle={16}
              contentContainerStyle={{ paddingHorizontal: (width - ITEM_WIDTH) / 2 }}
            >
              {ticketsArray.map((item, index) => renderCard(item, index))}
            </ScrollView>

            {/* Dots de paginação */}
            {ticketsArray.length > 1 && (
              <View style={[styles.paginationContainer, { marginTop: 15, marginBottom: 10 }]}>
                {ticketsArray.map((_, i) => (
                  <View key={i} style={[styles.paginationDot, i === activeIndex ? styles.dotActive : styles.dotInactive]} />
                ))}
              </View>
            )}

          </ScrollView>
        </ScrollView>
      </Animated.View>
    </View>
    </View >
  );
}
