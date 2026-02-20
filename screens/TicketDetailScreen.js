// src/screens/TicketDetailScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StatusBar, ScrollView,
  Animated, ImageBackground, Platform
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import * as ScreenCapture from 'expo-screen-capture';
import { COLORS, styles, width, BACKGROUND_URL, QR_SIZE } from '../config';

export default function TicketDetailScreen({ route, navigation }) {
  const { ticket } = route.params;
  const [qrSalt, setQrSalt] = useState(0);
  const progress = useRef(new Animated.Value(1)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const ticketsArray = ticket.ticketsList || Array.from({ length: ticket.ticketQuantity || 1 }, (_, i) => i);

  useFocusEffect(
    React.useCallback(() => {
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

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg, alignItems: Platform.OS === 'web' ? 'center' : 'stretch' }}>
      <View style={{ flex: 1, width: Platform.OS === 'web' ? width : '100%' }}>
        <StatusBar barStyle="light-content" backgroundColor="#121618" />

        {/* NavBar */}
        <View style={styles.detailNavBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
            <Ionicons name="chevron-back" size={26} color="#bbb" />
          </TouchableOpacity>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={styles.navTitle} numberOfLines={1}>{ticket.eventTitle}</Text>
            <Text style={styles.navSub} numberOfLines={1}>{ticket.subTitle}</Text>
          </View>
        </View>

        {/* Área de ingressos: scroll horizontal entre ingressos */}
        <View style={{ flex: 1, overflow: 'hidden' }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            style={[
              { flex: 1 },
              // No web, permite apenas pan horizontal neste nível
              Platform.OS === 'web' ? { touchAction: 'pan-x' } : {}
            ]}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveIndex(index);
            }}
          >
            {ticketsArray.map((item, index) => {
              const isObject = typeof item === 'object' && item !== null;
              const dynamicQRValue = `${(isObject ? item.qrCodeBase : ticket.qrCodeBase) || 'TICKET'}-${index + 1}-${qrSalt}`;
              const priceDisplay = isObject ? item.priceInfo : ticket.priceInfo;

              return (
                // Scroll vertical por ingresso — pan-y para o browser liberar o gesto
                <ScrollView
                  key={index}
                  style={[
                    { width, flex: 1 },
                    Platform.OS === 'web' ? { touchAction: 'pan-y', overflowY: 'auto' } : {}
                  ]}
                  contentContainerStyle={{ alignItems: 'center', paddingBottom: 40, paddingTop: 10 }}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled
                  bounces
                  scrollEnabled
                >
                  <View style={styles.ticketCardContainer}>
                    <View style={styles.blueHeaderContainer}>
                      <ImageBackground source={{ uri: BACKGROUND_URL }} style={styles.ticketBlueTop} resizeMode="cover" />
                      <View style={styles.scannerStrip}>
                        <Animated.View style={[styles.scannerBar, { width: barWidth }]} />
                      </View>
                    </View>
                    <View style={styles.ticketWhiteBottom}>
                      <View style={styles.qrSection}>
                        <View style={styles.qrContainer}>
                          <QRCode value={dynamicQRValue} size={QR_SIZE} ecl="Q" />
                        </View>
                        <View style={styles.qrInfoColumn}>
                          <View>
                            <Text style={styles.label}>SETOR</Text>
                            <Text style={styles.valueTitle}>{ticket.section}</Text>
                            <Text style={styles.label}>ACESSO</Text>
                            <Text style={styles.valueTitle}>{ticket.gate}</Text>
                          </View>
                          <TouchableOpacity style={styles.moreInfoBtn}>
                            <Text style={styles.moreInfoText}>Mais informação</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.divider} />
                      <View style={styles.detailsGrid}>
                        <View style={styles.gridRow}>
                          <View>
                            <Text style={styles.label}>TAXA</Text>
                            <Text style={styles.valueBold}>{priceDisplay}</Text>
                          </View>
                        </View>
                        <View style={[styles.gridRow, { marginTop: 15 }]}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.label}>SEÇÃO</Text>
                            <Text style={styles.valueBold}>{ticket.section}</Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.label}>FILEIRA</Text>
                            <Text style={styles.valueBold}>{ticket.rowInfo}</Text>
                          </View>
                        </View>
                        <View style={[styles.gridRow, { marginTop: 15 }]}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.label}>ABERTURA</Text>
                            <Text style={styles.valueBold}>{ticket.open}</Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.label}>INÍCIO</Text>
                            <Text style={styles.valueBold}>{ticket.start}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              );
            })}
          </ScrollView>
        </View>

        {/* Dots de paginação */}
        {ticket.ticketQuantity > 1 && (
          <View style={styles.paginationContainer}>
            {ticketsArray.map((_, i) => (
              <View key={i} style={[styles.paginationDot, i === activeIndex ? styles.dotActive : styles.dotInactive]} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}