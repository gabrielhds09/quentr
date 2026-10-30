import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TICKETS_DATA, COLORS, width } from '../config';

const BASE_TICKET =
  TICKETS_DATA.find((ticket) => ticket.id === 'bts-cadeira-inferior') ||
  TICKETS_DATA[0];

const SECTOR_ORDER = [
  'bts-cadeira-inferior',
  'bts-pista',
  'bts-cadeira-superior',
  'bts-arquibancada',
];

const EVENT_TICKETS = SECTOR_ORDER.flatMap((id) => {
  const sector = TICKETS_DATA.find((ticket) => ticket.id === id);
  if (!sector) return [];

  return (sector.ticketsList || []).map((item) => ({
    ...item,
    sectorId: sector.id,
    section: sector.section,
    gate: sector.gate,
    rowInfo: sector.rowInfo,
    open: sector.open,
    start: sector.start,
    headerDate: sector.headerDate,
    headerDay: sector.headerDay,
    headerCategory: sector.headerCategory,
    headerSection: sector.headerSection,
    headerGates: sector.headerGates,
  }));
});

const FEATURED_TICKET = {
  ...BASE_TICKET,
  countText: `${EVENT_TICKETS.length} ingressos`,
  ticketQuantity: EVENT_TICKETS.length,
  ticketsList: EVENT_TICKETS,
};

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={localStyles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <View style={localStyles.page}>
        <View style={localStyles.header}>
          <Text style={localStyles.title}>Meus ingressos</Text>
          <View style={localStyles.headerIcons}>
            <Ionicons name="notifications-outline" size={14} color="#687075" />
            <Ionicons name="person-outline" size={14} color="#687075" />
          </View>
        </View>

        <View style={localStyles.tabs}>
          <View style={localStyles.activeTab}>
            <Text style={localStyles.activeTabText}>Próximos</Text>
          </View>
        </View>

        <ScrollView
          style={localStyles.scroll}
          contentContainerStyle={localStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <TouchableOpacity
            activeOpacity={0.92}
            onPress={() =>
              navigation.navigate('TicketDetail', { ticket: FEATURED_TICKET })
            }
            style={localStyles.ticket}
          >
            <View style={localStyles.posterWrap}>
              <Image
                source={FEATURED_TICKET.image}
                style={localStyles.poster}
                resizeMode="cover"
              />

              <View style={localStyles.nowBadge}>
                <Text style={localStyles.nowText}>AGORA</Text>
              </View>

            </View>

            <View style={localStyles.ticketCopy}>
              <Text style={localStyles.meta} numberOfLines={1}>
                <Text style={localStyles.count}>{FEATURED_TICKET.countText}</Text>
                <Text style={localStyles.date}>   Sexta-feira 30 20:00hs</Text>
              </Text>
              <Text style={localStyles.eventTitle} numberOfLines={1}>
                {FEATURED_TICKET.eventTitle}
              </Text>
              <Text style={localStyles.venue}>{FEATURED_TICKET.venue}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
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
  header: {
    height: 67,
    paddingTop: 29,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    color: '#d8dcde',
    fontSize: 14.5,
    lineHeight: 18,
    fontWeight: '400',
  },
  headerIcons: {
    width: 50,
    paddingTop: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    opacity: 0.82,
  },
  tabs: {
    height: 49,
    paddingLeft: 27,
  },
  activeTab: {
    width: 128,
    height: 33,
    borderRadius: 5,
    backgroundColor: '#eef1f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabText: {
    color: '#171a1c',
    fontSize: 9.5,
    fontWeight: '500',
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: 80,
  },
  ticket: {
    width: width - 54,
    marginLeft: 24,
  },
  posterWrap: {
    width: '100%',
    height: (width - 54) * 0.84,
    borderRadius: 7,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#eceeef',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  nowBadge: {
    position: 'absolute',
    left: 14,
    bottom: 13,
    height: 16,
    paddingHorizontal: 7,
    borderRadius: 2,
    backgroundColor: '#22e7bd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nowText: {
    color: '#166c61',
    fontSize: 7,
    fontWeight: '700',
  },
  ticketCopy: {
    paddingTop: 13,
    paddingLeft: 14,
  },
  meta: {
    fontSize: 6.2,
    lineHeight: 8,
    marginBottom: 5,
  },
  count: {
    color: '#23d8cf',
    fontWeight: '600',
  },
  date: {
    color: '#7b8589',
    fontWeight: '400',
  },
  eventTitle: {
    color: '#f1f3f4',
    fontSize: 10.5,
    lineHeight: 13,
    fontWeight: '500',
  },
  venue: {
    color: '#8a9498',
    fontSize: 8,
    lineHeight: 11,
    marginTop: 2,
  },
});
