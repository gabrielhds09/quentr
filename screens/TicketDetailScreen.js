import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Animated,
  PanResponder,
  Platform,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, width } from '../config';

const CARD_WIDTH = width - 22;
const SCALE = CARD_WIDTH / 230;
const s = (value) => Math.round(value * SCALE * 10) / 10;
const QR_SIZE = Math.round(86 * SCALE);

function TicketCard({ item, index, qrSalt, barWidth, ticket }) {
  const panY = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > Math.abs(gestureState.dx) &&
        Math.abs(gestureState.dy) > 5,
      onPanResponderGrant: () => {
        panY.stopAnimation();
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
        Animated.spring(panY, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const dynamicQRValue = `${item.qrCodeBase || 'TICKET'}-${index + 1}-${qrSalt}`;
  const section = item.section || ticket.section;
  const gate = item.gate || ticket.gate;
  const rowInfo = item.rowInfo || ticket.rowInfo;
  const open = item.open || ticket.open;
  const start = item.start || ticket.start;
  const headerDate = item.headerDate || ticket.headerDate || '30/outubro';
  const headerDay = item.headerDay || ticket.headerDay || 'Sexta-feira';
  const headerSection = item.headerSection || ticket.headerSection || section.toUpperCase();
  const headerGates = item.headerGates || ticket.headerGates || gate.toUpperCase();
  const categoryText = item.priceInfo?.toUpperCase().includes('MEIA')
    ? 'MEIA-ENTRADA'
    : item.headerCategory || ticket.headerCategory || 'INTEIRA';

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        localStyles.cardColumn,
        { transform: [{ translateY: panY }] },
      ]}
    >
      <View style={localStyles.card}>
        <View style={localStyles.blueHeader}>
          <LinearGradient
            colors={['#312bb5', '#1848c7', '#0060cf']}
            locations={[0, 0.55, 1]}
            style={localStyles.gradient}
          >
            <Text style={localStyles.ticketmaster}>ticketmaster</Text>
            <Text style={localStyles.slogan}>#OAoVivoÉAgora</Text>

            <View style={localStyles.datePanel}>
              <View style={localStyles.dateBand}>
                <Text style={localStyles.bandText}>BTS</Text>
              </View>
              <View style={localStyles.dateBody}>
                <Text style={localStyles.dateText}>
                  {headerDate}
                </Text>
                <Text style={localStyles.dayText}>
                  {headerDay}
                </Text>
              </View>
            </View>

            <Text style={localStyles.category}>{categoryText}</Text>
            <Text style={localStyles.headerSection}>
              {headerSection}
            </Text>
            <Text style={localStyles.headerGates}>
              {headerGates}
            </Text>
          </LinearGradient>

          <View style={localStyles.scannerTrack}>
            <Animated.View style={[localStyles.scannerBar, { width: barWidth }]} />
          </View>
        </View>

        <View style={localStyles.qrBox}>
          <View style={localStyles.qrWrap}>
            <QRCode value={dynamicQRValue} size={QR_SIZE} ecl="Q" />
          </View>

          <View style={localStyles.qrInfo}>
            <Text style={localStyles.label}>SETOR</Text>
            <Text style={localStyles.qrValue}>{section}</Text>

            <Text style={[localStyles.label, localStyles.accessLabel]}>ACESSO</Text>
            <Text style={localStyles.qrValue}>{gate}</Text>

            <TouchableOpacity activeOpacity={0.8} style={localStyles.moreInfo}>
              <Text style={localStyles.moreInfoText}>Mais informação</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={localStyles.detailsBox}>
          <View>
            <Text style={localStyles.label}>TAXA</Text>
            <Text style={localStyles.detailValue}>{item.priceInfo}</Text>
          </View>

          <View style={localStyles.detailRow}>
            <View style={localStyles.detailColumn}>
              <Text style={localStyles.label}>SEÇÃO</Text>
              <Text style={localStyles.detailValue}>{section.toUpperCase()}</Text>
            </View>
            <View style={localStyles.detailColumn}>
              <Text style={localStyles.label}>FILEIRA</Text>
              <Text style={localStyles.detailValue}>{rowInfo}</Text>
            </View>
          </View>

          <View style={localStyles.detailRowLast}>
            <View style={localStyles.detailColumn}>
              <Text style={localStyles.label}>ABERTURA</Text>
              <Text style={localStyles.detailValue}>{open}</Text>
            </View>
            <View style={localStyles.detailColumn}>
              <Text style={localStyles.label}>INÍCIO</Text>
              <Text style={localStyles.detailValue}>{start}</Text>
            </View>
          </View>
        </View>
      </View>

      {item.titular ? (
        <View style={localStyles.footer}>
          <Ionicons
            name="return-down-back-outline"
            size={s(10)}
            color="#337c86"
            style={localStyles.footerIcon}
          />
          <Text style={localStyles.footerText}>
            Devolva ingresso a {item.titular}
          </Text>
        </View>
      ) : null}
    </Animated.View>
  );
}

export default function TicketDetailScreen({ route, navigation }) {
  const { ticket } = route.params;
  const tickets = ticket.ticketsList?.length
    ? ticket.ticketsList
    : [{
        priceInfo: ticket.priceInfo,
        qrCodeBase: ticket.qrCodeBase,
        titular: ticket.titular,
      }];
  const [qrSalt, setQrSalt] = useState(0);
  const progress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let mounted = true;

    const animate = () => {
      progress.setValue(1);
      Animated.timing(progress, {
        toValue: 0,
        duration: 15000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (mounted && finished) {
          setQrSalt((value) => value + 1);
          animate();
        }
      });
    };

    animate();
    return () => {
      mounted = false;
      progress.stopAnimation();
    };
  }, [progress]);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={localStyles.screen}>
      <View style={localStyles.page}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}
          style={localStyles.nav}
        >
          <Text style={localStyles.navTitle} numberOfLines={1}>
            {ticket.eventTitle}
          </Text>
          <Text style={localStyles.navSub} numberOfLines={1}>
            {ticket.subTitle}
          </Text>
        </TouchableOpacity>

        <ScrollView
          style={localStyles.scroll}
          contentContainerStyle={localStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <ScrollView
            horizontal
            pagingEnabled
            snapToInterval={width}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            nestedScrollEnabled
            style={localStyles.ticketCarousel}
          >
            {tickets.map((item, index) => (
              <View key={`${item.qrCodeBase || 'ticket'}-${index}`} style={localStyles.ticketPage}>
                <TicketCard
                  item={item}
                  index={index}
                  qrSalt={qrSalt}
                  barWidth={barWidth}
                  ticket={ticket}
                />
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
  },
  page: {
    flex: 1,
    width: Platform.OS === 'web' ? width : '100%',
    backgroundColor: COLORS.bg,
  },
  nav: {
    height: s(47),
    paddingLeft: s(31),
    paddingRight: s(18),
    paddingBottom: s(15),
    justifyContent: 'flex-end',
  },
  navTitle: {
    color: '#ced2d4',
    fontSize: s(9.5),
    lineHeight: s(12),
    fontWeight: '500',
  },
  navSub: {
    color: '#737b7f',
    fontSize: s(7),
    lineHeight: s(9),
    marginTop: s(2),
    fontWeight: '400',
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: s(80),
  },
  ticketCarousel: {
    width,
  },
  ticketPage: {
    width,
  },
  cardColumn: {
    width: CARD_WIDTH,
    marginLeft: 16,
    touchAction: 'pan-x',
    userSelect: 'none',
  },
  card: {
    width: '100%',
    borderRadius: s(4),
    overflow: 'hidden',
    backgroundColor: '#f3f7f5',
  },
  blueHeader: {
    height: s(174),
    position: 'relative',
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    paddingTop: s(14),
  },
  ticketmaster: {
    color: '#ffffff',
    fontSize: s(24),
    lineHeight: s(29),
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: s(-1),
  },
  slogan: {
    color: '#5be2ee',
    fontSize: s(8.5),
    lineHeight: s(10),
    fontWeight: '600',
    marginTop: s(-1),
  },
  datePanel: {
    width: s(184),
    height: s(52),
    marginTop: s(7),
    borderRadius: s(6),
    overflow: 'hidden',
    backgroundColor: 'rgba(242,248,245,0.96)',
  },
  dateBand: {
    height: s(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2bc4ba',
  },
  bandText: {
    color: '#0068bd',
    fontSize: s(9),
    lineHeight: s(11),
    fontWeight: '800',
  },
  dateBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: s(2),
  },
  dateText: {
    color: '#174dc1',
    fontSize: s(18),
    lineHeight: s(20),
    fontWeight: '900',
    letterSpacing: s(-0.5),
  },
  dayText: {
    color: '#174282',
    fontSize: s(8),
    lineHeight: s(9),
    fontWeight: '600',
  },
  category: {
    color: '#ffffff',
    fontSize: s(22),
    lineHeight: s(24),
    fontWeight: '900',
    letterSpacing: s(1),
    marginTop: s(3),
  },
  headerSection: {
    color: '#26e7df',
    fontSize: s(16.5),
    lineHeight: s(18),
    fontWeight: '900',
    letterSpacing: s(0.7),
    marginTop: s(-1),
  },
  headerGates: {
    color: '#ffffff',
    fontSize: s(8.5),
    lineHeight: s(10),
    fontWeight: '800',
    letterSpacing: s(0.6),
    marginTop: s(1),
  },
  scannerTrack: {
    height: s(2),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#23d7d2',
  },
  scannerBar: {
    height: '100%',
    backgroundColor: '#6efff2',
  },
  qrBox: {
    height: s(108),
    paddingHorizontal: s(13),
    paddingTop: s(14),
    paddingBottom: s(8),
    flexDirection: 'row',
    backgroundColor: '#f6faf7',
  },
  qrWrap: {
    width: QR_SIZE,
    height: QR_SIZE,
  },
  qrInfo: {
    flex: 1,
    marginLeft: s(12),
    paddingTop: s(1),
  },
  label: {
    color: '#7b8583',
    fontSize: s(5.3),
    lineHeight: s(7),
    fontWeight: '500',
    letterSpacing: s(0.35),
  },
  qrValue: {
    color: '#313939',
    fontSize: s(8.8),
    lineHeight: s(11),
    fontWeight: '400',
  },
  accessLabel: {
    marginTop: s(6),
  },
  moreInfo: {
    height: s(22),
    marginTop: s(20),
    marginLeft: s(2),
    borderRadius: s(2),
    backgroundColor: '#e2f4f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreInfoText: {
    color: '#33949a',
    fontSize: s(6.5),
    fontWeight: '500',
  },
  detailsBox: {
    height: s(101),
    paddingHorizontal: s(12),
    paddingTop: s(9),
    paddingBottom: s(9),
    backgroundColor: '#f0f5f2',
  },
  detailValue: {
    color: '#38403f',
    fontSize: s(8.5),
    lineHeight: s(11),
    fontWeight: '400',
  },
  detailRow: {
    marginTop: s(14),
    flexDirection: 'row',
  },
  detailRowLast: {
    marginTop: s(12),
    flexDirection: 'row',
  },
  detailColumn: {
    width: '50%',
  },
  footer: {
    marginTop: s(20),
    paddingLeft: s(1),
    paddingRight: s(25),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  footerIcon: {
    marginTop: s(1),
    marginRight: s(5),
  },
  footerText: {
    flex: 1,
    color: '#a5aaac',
    fontSize: s(8),
    lineHeight: s(10),
    fontWeight: '400',
  },
});
