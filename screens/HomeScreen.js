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

const SECTOR_ORDER = [
  'bts-arquibancada',
  'bts-cadeira-inferior',
  'bts-pista',
  'bts-cadeira-superior',
];

const FEATURED_TICKETS = SECTOR_ORDER.map((id) =>
  TICKETS_DATA.find((ticket) => ticket.id === id)
).filter(Boolean);

const [PRIMARY_TICKET, ...COMPACT_TICKETS] = FEATURED_TICKETS;

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={localStyles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <View style={localStyles.page}>
        <View style={localStyles.header}>
          <Text style={localStyles.title}>Meus ingressos</Text>
          <View style={localStyles.headerIcons}>
            <Ionicons name="notifications-outline" size={18} color="#687075" />
            <Ionicons name="person-outline" size={18} color="#687075" />
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
          {PRIMARY_TICKET ? (
            <TouchableOpacity
              activeOpacity={0.92}
              onPress={() =>
                navigation.navigate('TicketDetail', { ticket: PRIMARY_TICKET })
              }
              style={localStyles.ticket}
            >
              <View style={localStyles.posterWrap}>
                <Image
                  source={PRIMARY_TICKET.image}
                  style={localStyles.poster}
                  resizeMode="cover"
                />

                <View style={localStyles.nowBadge}>
                  <Text style={localStyles.nowText}>AGORA</Text>
                </View>
              </View>

              <View style={localStyles.ticketCopy}>
                <Text style={localStyles.meta} numberOfLines={1}>
                  <Text style={localStyles.count}>{PRIMARY_TICKET.countText}</Text>
                  <Text style={localStyles.date}>   {PRIMARY_TICKET.dateText}</Text>
                </Text>
                <Text style={localStyles.eventTitle} numberOfLines={1}>
                  {PRIMARY_TICKET.eventTitle}
                </Text>
                <Text style={localStyles.venue}>{PRIMARY_TICKET.venue}</Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {COMPACT_TICKETS.map((ticket) => (
            <TouchableOpacity
              key={ticket.id}
              activeOpacity={0.92}
              onPress={() =>
                navigation.navigate('TicketDetail', { ticket })
              }
              style={localStyles.compactTicket}
            >
              <View style={localStyles.compactPosterWrap}>
                <Image
                  source={ticket.image}
                  style={localStyles.compactPoster}
                  resizeMode="cover"
                />
              </View>

              <View style={localStyles.compactCopy}>
                <Text style={localStyles.meta} numberOfLines={1}>
                  <Text style={localStyles.count}>{ticket.countText}</Text>
                  <Text style={localStyles.date}>   {ticket.dateText}</Text>
                </Text>
                <Text style={[localStyles.eventTitle, localStyles.compactEventTitle]} numberOfLines={1}>
                  {ticket.eventTitle}
                </Text>
                <Text style={localStyles.venue}>{ticket.venue}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
    fontSize: 19,
    lineHeight: 23,
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
    fontSize: 13,
    fontWeight: '500',
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: 80,
  },
  ticket: {
    width: width - 2,
    marginLeft: 1,
    marginBottom: 28,
  },
  posterWrap: {
    width: '100%',
    height: (width - 2) * 0.84,
    borderRadius: 7,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#eceeef',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  compactTicket: {
    width: width - 54,
    marginLeft: 24,
    marginBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactPosterWrap: {
    width: 68,
    height: 68,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#eceeef',
  },
  compactPoster: {
    width: '100%',
    height: '100%',
  },
  compactCopy: {
    flex: 1,
    marginLeft: 11,
  },
  nowBadge: {
    position: 'absolute',
    left: 14,
    bottom: 13,
    height: 18,
    paddingHorizontal: 8,
    borderRadius: 2,
    backgroundColor: '#22e7bd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nowText: {
    color: '#166c61',
    fontSize: 8,
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'sans-serif',
    fontWeight: '600',
    letterSpacing: 0,
  },
  ticketCopy: {
    paddingTop: 13,
    paddingLeft: 14,
  },
  meta: {
    fontSize: 9.2,
    lineHeight: 11,
    marginBottom: 7,
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
    fontSize: 15.5,
    lineHeight: 19,
    fontWeight: '500',
  },
  compactEventTitle: {
    fontSize: 12.5,
    lineHeight: 15,
  },
  venue: {
    color: '#8a9498',
    fontSize: 11.5,
    lineHeight: 14,
    marginTop: 2,
  },
});
