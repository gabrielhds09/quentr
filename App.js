import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView, Animated, Dimensions, ImageBackground, FlatList } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
// Biblioteca para impedir print/gravação de tela
import * as ScreenCapture from 'expo-screen-capture';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const QR_SIZE = 125; 

// --- CONFIGURAÇÃO ---
const BACKGROUND_URL = "https://i.postimg.cc/XYj9d0Gn/Design-sem-nome.png";

// --- CORES ---
const COLORS = {
  bg: '#121618',          
  blueHeader: '#0026b9',  
  cyanBar: '#00FFFF',     
  labelGrey: '#666666',   
  valueBlack: '#000000',  
  pillBtn: '#E6F6FE',     
  pillText: '#0066CC',    
  divider: '#EEEEEE',     
  white: '#FFFFFF',
  cardBg: '#1A2224',
  teal: '#439193',
  greyText: '#818A8F',
  dotActive: '#FFFFFF',
  dotInactive: '#444444'
};

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  // HOME
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: COLORS.white, fontSize: 24, fontWeight: '700' },
  headerIcons: { flexDirection: 'row' },
  iconBtn: { backgroundColor: COLORS.cardBg, padding: 8, borderRadius: 8, marginLeft: 10 },
  
  tabWrapper: { paddingHorizontal: 20, marginBottom: 15 },
  tabContainer: { flexDirection: 'row', backgroundColor: COLORS.cardBg, borderRadius: 10, padding: 4 },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: COLORS.white },
  tabText: { fontWeight: '600', fontSize: 14 },
  textActive: { color: '#000000' },
  textInactive: { color: COLORS.greyText },
  
  sectionTitle: { color: '#ddd', fontSize: 15, fontWeight: 'bold', marginLeft: 20, marginTop: 10, marginBottom: 10 },
  listCard: { backgroundColor: COLORS.cardBg, flexDirection: 'row', marginHorizontal: 20, marginBottom: 12, borderRadius: 8, height: 105, overflow: 'hidden' },
  listCardImage: { width: 105, height: '100%' },
  listCardInfo: { flex: 1, justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 10 },
  listTopLine: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  listCount: { color: COLORS.teal, fontSize: 13, fontWeight: '600' },
  listDate: { color: COLORS.greyText, fontSize: 13, fontWeight: '400' },
  listTitle: { color: COLORS.white, fontSize: 16, fontWeight: '600', marginBottom: 3 },
  listVenue: { color: COLORS.greyText, fontSize: 13, fontWeight: '400' },

  // DETAIL
  detailContainer: { flex: 1, backgroundColor: '#121212' }, 
  detailNavBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingTop: 60, 
    paddingBottom: 15, 
    paddingHorizontal: 20,
    zIndex: 100,
    backgroundColor: '#121212' 
  },
  navTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginLeft: 10, flexShrink: 1 },
  navSub: { color: '#bbb', fontSize: 13, marginLeft: 10, marginTop: 4, flexShrink: 1 },

  paginationContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  paginationDot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  dotActive: { backgroundColor: COLORS.dotActive },
  dotInactive: { backgroundColor: COLORS.dotInactive },

  // CARTÃO UNIFICADO
  ticketCardContainer: {
    width: CARD_WIDTH,
    marginTop: 10,
    borderRadius: 16, 
    overflow: 'hidden', 
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20
  },
  
  blueHeaderContainer: { 
    position: 'relative',
    height: 270, 
    width: '100%',
    backgroundColor: COLORS.blueHeader, 
    overflow: 'hidden', 
  },
  
  ticketBlueTop: { 
    width: '100%', 
    height: '100%', 
    justifyContent: 'center',
    alignItems: 'center'
  },

  // SCANNER
  scannerStrip: { 
    height: 6, 
    width: '100%', 
    backgroundColor: 'rgba(0, 255, 255, 0.1)', 
    overflow: 'hidden', 
    position: 'absolute', 
    bottom: 0 
  },
  
  scannerBar: { 
    height: '100%', 
    backgroundColor: COLORS.cyanBar, 
  },
  
  ticketWhiteBottom: { padding: 20, backgroundColor: COLORS.white },

  // QR SECTION
  qrSection: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginTop: 5
  },
  qrContainer: { paddingTop: 0 },
  
  qrInfoColumn: { 
    flex: 1, 
    marginLeft: 15, 
    justifyContent: 'flex-start',
  }, 
  
  label: { color: COLORS.labelGrey, fontSize: 10, fontWeight: '700', marginBottom: 2, textTransform: 'uppercase' },
  valueTitle: { color: COLORS.valueBlack, fontSize: 15, fontWeight: '700', lineHeight: 18, marginBottom: 8 },
  
  moreInfoBtn: { backgroundColor: COLORS.pillBtn, paddingVertical: 8, borderRadius: 6, alignItems: 'center', width: '100%', marginTop: 8 },
  moreInfoText: { color: COLORS.pillText, fontSize: 12, fontWeight: '700' },

  divider: { height: 1, backgroundColor: '#F0F0F0', marginTop: 20, marginBottom: 20 },
  
  detailsGrid: { flexDirection: 'column' },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between' },
  valueBold: { color: COLORS.valueBlack, fontSize: 15, fontWeight: '700' },
});

// --- DADOS ---
const TICKETS_DATA = [
  {
    id: '1',
    eventTitle: "Oasis: Live '25",
    subTitle: "22/11/2025 - MorumBis",
    venue: "MorumBis",
    countText: "4 Ingressos",
    ticketQuantity: 4, 
    dateText: "Sábado 22 21:00hs",
    image: "https://cdn.getcrowder.com/images/b0e11c30-87c6-429c-be01-64f8a7de5e51-768x768png.png?w=960&format=webp",
    sortDate: "2025-11-22",
    fullDate: "22/11/2025",
    section: "CADEIRA SUPERIOR",
    gate: "Portões 5 e 16",
    priceInfo: "Inteira - R$ 1.250",
    rowInfo: "Não numerado",
    qrCodeBase: "OASIS-SAT-22",
    open: "16:00",
    start: "21:00"
  },
   {
    id: '2',
    eventTitle: "Oasis: Live '25",
    subTitle: "22/11/2025 - MorumBis",
    venue: "MorumBis",
    countText: "2 Ingressos",
    ticketQuantity: 2, 
    dateText: "Sábado 22 21:00hs",
    image: "https://cdn.getcrowder.com/images/b0e11c30-87c6-429c-be01-64f8a7de5e51-768x768png.png?w=960&format=webp",
    sortDate: "2025-11-23",
    fullDate: "22/11/2025",
    section: "Arquibancada",
    gate: "Portões 6 e 15",
    priceInfo: "Inteira - R$ 590",
    rowInfo: "Não numerado",
    qrCodeBase: "OASIS-SAT-22",
    open: "16:00",
    start: "21:00"
  },


  {
    id: '4',
    eventTitle: "Bruno Mars - São Paulo",
    venue: "MorumBis",
    countText: "2 Ingressos",
    ticketQuantity: 2,
    dateText: "Sexta-feira 04 21:00hs",
    sortDate: "2024-11-04",
    image: "https://th.bing.com/th/id/OIP.u3FfYYm0EBxOW9qqhT7OmAHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: '5',
    eventTitle: "Linkin Park - São Paulo",
    venue: "Allianz Parque",
    countText: "2 Ingressos",
    ticketQuantity: 2,
    dateText: "Sexta-feira 15 • 20:30",
    sortDate: "2024-11-15",
    image: "https://th.bing.com/th/id/OIP.KHc1ZiN_b-LwYPQfRAe9nAHaHa?w=174&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3"
  }
];

const Stack = createStackNavigator();

// --- TELA HOME ---
function HomeScreen({ navigation }) {
  const [tab, setTab] = useState('proximos');
  const upcoming = TICKETS_DATA.filter(t => t.sortDate >= "2025-01-01").sort((a,b) => a.sortDate.localeCompare(b.sortDate));
  const past = TICKETS_DATA.filter(t => t.sortDate.includes("2024"));

  const renderCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.listCard} 
      activeOpacity={0.9}
      onPress={() => navigation.navigate('TicketDetail', { ticket: item })}
    >
      <Image source={{ uri: item.image }} style={styles.listCardImage} resizeMode="cover" />
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
    <SafeAreaView style={styles.container}>
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
      <ScrollView style={{flex:1}}>
        {tab === 'proximos' ? (
          <View>
            <Text style={styles.sectionTitle}>Próximos Shows</Text>
            {upcoming.map((item, i) => <View key={i}>{renderCard({item})}</View>)}
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Novembro 2024</Text>
            {past.map((item, i) => <View key={i}>{renderCard({item})}</View>)}
          </View>
        )}
        <View style={{height: 40}}/>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- TELA DETALHES ---
function TicketDetailScreen({ route, navigation }) {
  const { ticket } = route.params;
  const [qrSalt, setQrSalt] = useState(0);
  const progress = useRef(new Animated.Value(1)).current; 
  const [activeIndex, setActiveIndex] = useState(0);
  const ticketsArray = Array.from({ length: ticket.ticketQuantity || 1 }, (_, i) => i);

  // 1. PROTEÇÃO DE TELA
  useFocusEffect(
    React.useCallback(() => {
      const activateProtection = async () => {
        await ScreenCapture.preventScreenCaptureAsync();
      };
      activateProtection();
      return () => {
        ScreenCapture.allowScreenCaptureAsync();
      };
    }, [])
  );

  // 2. ANIMAÇÃO DA BARRA + TROCA DE QR CODE
  const animateBar = () => {
    progress.setValue(1); // Reinicia barra cheia
    Animated.timing(progress, {
      toValue: 0, // Vai até 0
      duration: 15000, // 15 segundos
      useNativeDriver: false 
    }).start(({ finished }) => {
      if (finished) {
        setQrSalt(prev => prev + 1); // Troca o QR Code
        animateBar(); // Loop
      }
    });
  };

  useEffect(() => {
    animateBar();
  }, []);
  
  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  const renderTicketItem = ({ item, index }) => {
    const dynamicQRValue = `${ticket.qrCodeBase || "TICKET"}-${index + 1}-${qrSalt}`;

    return (
      <View style={{ width: width, alignItems: 'center' }}>
        <View style={styles.ticketCardContainer}>
            
            {/* HEADER AZUL */}
            <View style={styles.blueHeaderContainer}>
              <ImageBackground 
                source={{ uri: BACKGROUND_URL }} 
                style={styles.ticketBlueTop}
                resizeMode="cover"
              />
              <View style={styles.scannerStrip}>
                  <Animated.View style={[styles.scannerBar, { width: barWidth }]} />
              </View>
            </View>

            {/* BRANCO */}
            <View style={styles.ticketWhiteBottom}>
               
               {/* QR SECTION */}
               <View style={styles.qrSection}>
                  <View style={styles.qrContainer}>
                     <QRCode 
                        value={dynamicQRValue} 
                        size={QR_SIZE} 
                        ecl="Q" 
                     />
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
                        <Text style={styles.valueBold}>{ticket.priceInfo}</Text>
                     </View>
                  </View>

                  <View style={[styles.gridRow, {marginTop: 15}]}>
                     <View style={{flex: 1}}>
                        <Text style={styles.label}>SEÇÃO</Text>
                        <Text style={styles.valueBold}>{ticket.section}</Text>
                     </View>
                     <View style={{flex: 1}}>
                        <Text style={styles.label}>FILEIRA</Text>
                        <Text style={styles.valueBold}>{ticket.rowInfo}</Text>
                     </View>
                  </View>

                  <View style={[styles.gridRow, {marginTop: 15}]}>
                     <View style={{flex: 1}}>
                        <Text style={styles.label}>ABERTURA</Text>
                        <Text style={styles.valueBold}>{ticket.open}</Text>
                     </View>
                     <View style={{flex: 1}}>
                        <Text style={styles.label}>INÍCIO</Text>
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
    <View style={styles.detailContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#121618" />
      
      <View style={styles.detailNavBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 5}}>
           <Ionicons name="chevron-back" size={26} color="#bbb" />
        </TouchableOpacity>
        <View style={{flex: 1, paddingRight: 10}}>
           <Text style={styles.navTitle}>{ticket.eventTitle}</Text>
           <Text style={styles.navSub}>{ticket.subTitle}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{paddingVertical: 10}} bounces={false}>
        <FlatList
          data={ticketsArray}
          renderItem={renderTicketItem}
          keyExtractor={(item) => item.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
        />

        {ticket.ticketQuantity > 1 && (
          <View style={styles.paginationContainer}>
            {ticketsArray.map((_, i) => (
              <View 
                key={i} 
                style={[
                  styles.paginationDot, 
                  i === activeIndex ? styles.dotActive : styles.dotInactive
                ]} 
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}