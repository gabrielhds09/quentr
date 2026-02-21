// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TICKETS_DATA, COLORS, styles } from '../config';

const TODAY = "2026-02-21";

export default function HomeScreen({ navigation }) {
  const [tab, setTab] = useState('proximos');

  const upcoming = TICKETS_DATA
    .filter(t => t.sortDate >= TODAY)
    .sort((a, b) => a.sortDate.localeCompare(b.sortDate));

  const past = TICKETS_DATA
    .filter(t => t.sortDate < TODAY)
    .sort((a, b) => b.sortDate.localeCompare(a.sortDate));

  // Agrupa shows passados por mês (monthLabel)
  const pastByMonth = past.reduce((acc, ticket) => {
    const label = ticket.monthLabel || "Anterior";
    if (!acc[label]) acc[label] = [];
    acc[label].push(ticket);
    return acc;
  }, {});

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.listCard}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('TicketDetail', { ticket: item })}
    >
      <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.listCardImage} resizeMode="cover" />
      <View style={styles.listCardInfo}>
        <Text style={styles.listTopLine} numberOfLines={1}>
          <Text style={styles.listCount}>{item.countText}</Text>
          <Text style={styles.listDate}>  {item.dateText}</Text>
        </Text>
        <Text style={styles.listTitle} numberOfLines={1}>{item.eventTitle}</Text>
        <Text style={styles.listVenue} numberOfLines={1}>{item.venue}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { alignItems: 'center' }]}>
      <View style={styles.webWrapper}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meus ingressos</Text>
          <View style={styles.headerIcons}>
            <View style={styles.iconBtn}><Ionicons name="notifications-outline" size={22} color="#fff" /></View>
            <View style={styles.iconBtn}><Ionicons name="person-outline" size={22} color="#fff" /></View>
          </View>
        </View>
        <View style={styles.tabWrapper}>
          <View style={styles.tabContainer}>
            <TouchableOpacity style={[styles.tabBtn, tab === 'proximos' && styles.tabActive]} onPress={() => setTab('proximos')}>
              <Text style={[styles.tabText, tab === 'proximos' ? styles.textActive : styles.textInactive]}>Próximos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tabBtn, tab === 'anterior' && styles.tabActive]} onPress={() => setTab('anterior')}>
              <Text style={[styles.tabText, tab === 'anterior' ? styles.textActive : styles.textInactive]}>Anterior</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={true}
          alwaysBounceVertical={true}
          overScrollMode="always"
          contentContainerStyle={{
            paddingBottom: 80,
            minHeight: Dimensions.get('window').height + 200, // Efeito "puxar para baixo" na lista
          }}
          style={{ flex: 1 }}
        >
          {tab === 'proximos' ? (
            <View>
              <Text style={styles.sectionTitle}>Próximos Shows</Text>
              {upcoming.map((item, i) => <View key={i}>{renderCard({ item })}</View>)}
            </View>
          ) : (
            <View>
              {Object.entries(pastByMonth).map(([month, tickets]) => (
                <View key={month}>
                  <Text style={styles.sectionTitle}>{month}</Text>
                  {tickets.map((item, i) => <View key={i}>{renderCard({ item })}</View>)}
                </View>
              ))}
            </View>
          )}
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}