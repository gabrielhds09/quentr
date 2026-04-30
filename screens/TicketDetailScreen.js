// src/screens/TicketDetailScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StatusBar, ScrollView,
  Animated, ImageBackground, Platform, Dimensions, PanResponder
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { COLORS, styles, width, BACKGROUND_URL, QR_SIZE, TICKETS_DATA, TM_LOGO_URL } from '../config';

const ITEM_WIDTH = width * 0.94;

// Componente individual para cada ingresso com seu próprio estado de arraste
function TicketCard({ item, index, qrSalt, barWidth, ticket }) {
  const panY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Intercepta apenas se o movimento for predominantemente vertical
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        panY.setValue(gestureState.dy * 0.7);
      },
      onPanResponderRelease: () => {
        Animated.spring(panY, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderTerminate: () => {
        Animated.spring(panY, { toValue: 0, useNativeDriver: false }).start();
      },
    })
  ).current;

  const isObject = typeof item === 'object' && item !== null;
  const dynamicQRValue = `${(isObject ? item.qrCodeBase : ticket.qrCodeBase) || 'TICKET'}-${index + 1}-${qrSalt}`;
  const priceDisplay = isObject ? item.priceInfo : ticket.priceInfo;
  const isMeia = priceDisplay && priceDisplay.toUpperCase().includes('MEIA');
  const categoryText = isMeia ? 'MEIA-ENTRADA' : 'INTEIRA';

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        width: ITEM_WIDTH,
        alignItems: 'center',
        transform: [{ translateY: panY }]
      }}
    >
      <View style={styles.ticketCardContainer}>
        <View style={{ borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff' }}>
          <View style={[styles.blueHeaderContainer, { backgroundColor: '#0149D2' }]}>
            <ImageBackground source={typeof BACKGROUND_URL === 'string' ? { uri: BACKGROUND_URL } : BACKGROUND_URL} style={styles.ticketBlueTop} resizeMode="contain">
              <View style={{ flex: 1 }} />
              <View style={{ paddingBottom: 15, alignItems: 'center', paddingHorizontal: 25 }}>
                <Text style={{ color: '#fff', fontSize: 8.5, fontWeight: '800', textAlign: 'center', opacity: 0.95, letterSpacing: 0.4 }}>
                  TAXA DE ADMINISTRAÇÃO · WT -30 R$ 21,74
                </Text>
                <Text style={{ color: '#fff', fontSize: 7.2, fontWeight: '800', textAlign: 'center', marginTop: 4, opacity: 0.95, letterSpacing: 0.2 }}>
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
                  <Text style={[styles.label, { letterSpacing: 1.2, fontSize: 8 }]}>SETOR</Text>
                  <Text style={[styles.valueTitle, { fontSize: 16.5, fontWeight: '600' }]}>{ticket.section}</Text>
                  <Text style={[styles.label, { letterSpacing: 1.2, fontSize: 8, marginTop: 5 }]}>ACESSO</Text>
                  <Text style={[styles.valueTitle, { fontSize: 16.5, fontWeight: '600' }]}>{ticket.gate}</Text>
                </View>
                <TouchableOpacity style={styles.moreInfoBtn}>
                  <Text style={styles.moreInfoText}>Mais informação</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.ticketBoxBottom}>
          <View style={styles.detailsGrid}>
            <View style={styles.gridRow}>
              <View>
                <Text style={[styles.label, { letterSpacing: 1.2, fontSize: 8 }]}>TAXA</Text>
                <Text style={styles.valueBold}>{priceDisplay}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.gridRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, { letterSpacing: 1.2, fontSize: 8 }]}>SEÇÃO</Text>
                <Text style={styles.valueBold}>{ticket.section.toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, { letterSpacing: 1.2, fontSize: 8 }]}>FILEIRA</Text>
                <Text style={styles.valueBold}>{ticket.rowInfo}</Text>
              </View>
            </View>
            <View style={[styles.gridRow, { marginTop: 22 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, { letterSpacing: 1.2, fontSize: 8 }]}>ABERTURA</Text>
                <Text style={styles.valueBold}>{ticket.open}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, { letterSpacing: 1.2, fontSize: 8 }]}>INÍCIO</Text>
                <Text style={styles.valueBold}>{ticket.start}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

export default function TicketDetailScreen({ route, navigation }) {
  const { ticket } = route.params;
  const [qrSalt, setQrSalt] = useState(0);
  const progress = useRef(new Animated.Value(1)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const ticketsArray = ticket.ticketsList || Array.from({ length: ticket.ticketQuantity || 1 }, (_, i) => i);

  useFocusEffect(
    React.useCallback(() => {
      opacityAnim.setValue(1);
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

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, alignItems: Platform.OS === 'web' ? 'center' : 'stretch' }}>
      <View style={{ flex: 1, width: Platform.OS === 'web' ? width : '100%' }}>
        <StatusBar barStyle="light-content" backgroundColor="#121618" />

        <View style={[styles.detailNavBar, { paddingVertical: 8 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
            <Ionicons name="chevron-back" size={26} color="#bbb" />
          </TouchableOpacity>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={styles.navTitle} numberOfLines={1}>{ticket.eventTitle}</Text>
            <Text style={styles.navSub} numberOfLines={1}>{ticket.subTitle}</Text>
          </View>
        </View>

        <Animated.View style={{ flex: 1, opacity: opacityAnim }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingTop: 0,
              paddingBottom: 100,
            }}
          >
            {ticketsArray.length > 1 ? (
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
                {ticketsArray.map((item, index) => (
                  <TicketCard
                    key={index}
                    item={item}
                    index={index}
                    qrSalt={qrSalt}
                    barWidth={barWidth}
                    ticket={ticket}
                  />
                ))}
              </ScrollView>
            ) : (
              <View style={{ width: width, alignItems: 'center' }}>
                {ticketsArray.map((item, index) => (
                  <TicketCard
                    key={index}
                    item={item}
                    index={index}
                    qrSalt={qrSalt}
                    barWidth={barWidth}
                    ticket={ticket}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        </Animated.View>
      </View>
    </View>
  );
}
