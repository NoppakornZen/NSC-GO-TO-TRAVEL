import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Assets
const LOGO = require("../assets/lobby/logo.png");
const AVATAR_BEAR = require("../assets/lobby/avatar-bear.png");
const HERO_BEAR = require("../assets/lobby/hero-bear.png");
const FRIEND_HAMSTER = require("../assets/lobby/friend-hamster.png");
const FRIEND_OTTER = require("../assets/lobby/friend-otter.png");
const FRIEND_PANDA = require("../assets/lobby/friend-panda.png");
const MAP_MISSION = require("../assets/lobby/map-mission.png");

export default function LobbyScreen({ navigation }: any) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F1E8" />
      <SafeAreaView style={styles.safe}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Bar */}
          <View style={styles.topBar}>
            <View style={styles.topBarLeft}>
              <Image source={AVATAR_BEAR} style={styles.avatar} />
              <View>
                <Text style={styles.greeting}>สวัสดี, Noppakorn!</Text>
                <Text style={styles.level}>Explorer Lv.1</Text>
              </View>
            </View>
            <View style={styles.topBarCenter}>
              <Image source={LOGO} style={styles.logo} resizeMode="contain" />
            </View>
            <View style={styles.topBarRight}>
              <TouchableOpacity style={styles.iconBtn}>
                <Text style={styles.iconPaw}>🐾</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Text style={styles.iconBag}>💼</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Text style={styles.iconBell}>🔔</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Hero Banner */}
          <View style={styles.heroBanner}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>องค์อนภา{"\n"}สร้างความทรงจำ</Text>
              <Text style={styles.heroSubtitle}>Make with Scout Companion</Text>
              <TouchableOpacity style={styles.heroButton}>
                <LinearGradient
                  colors={["#8B5A3C", "#A67C52", "#C4915F"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.heroButtonGradient}
                >
                  <Text style={styles.heroButtonText}>เริ่มต้นค้นหาเส้นทาง</Text>
                  <Text style={styles.heroButtonArrow}>→</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <Image source={HERO_BEAR} style={styles.heroBear} resizeMode="contain" />
          </View>

          {/* Main Menu Icons */}
          <View style={styles.mainMenu}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>🐾</Text>
              </View>
              <Text style={styles.menuLabel}>Auto Scout</Text>
              <Text style={styles.menuSublabel}>ค้นหาเส้นทางอัตโนมัติ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>📱</Text>
              </View>
              <Text style={styles.menuLabel}>เมนู AR</Text>
              <Text style={styles.menuSublabel}>Ler Manual</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>📖</Text>
              </View>
              <Text style={styles.menuLabel}>Memory Book</Text>
              <Text style={styles.menuSublabel}>บันทึกความทรงจำ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>🚩</Text>
              </View>
              <Text style={styles.menuLabel}>ภารกิจ & ของรางวัล</Text>
              <Text style={styles.menuSublabel}>Rewards&quest</Text>
            </TouchableOpacity>
          </View>

          {/* Mission Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>ภารกิจพิเศษ</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>ดูทั้งหมด →</Text>
              </TouchableOpacity>
            </View>
            <Image source={MAP_MISSION} style={styles.mapImage} resizeMode="contain" />
            <Text style={styles.missionLabel}>Auto ~~ Checkpoint</Text>
          </View>

          {/* Friends Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>เพื่อนร่วมทริปของคุณ</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>ดูทั้งหมด →</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.friendsRow}>
              <View style={styles.friendCard}>
                <Image source={FRIEND_HAMSTER} style={styles.friendImage} resizeMode="contain" />
              </View>
              <View style={styles.friendCard}>
                <Image source={FRIEND_OTTER} style={styles.friendImage} resizeMode="contain" />
              </View>
              <View style={styles.friendCard}>
                <Image source={FRIEND_PANDA} style={styles.friendImage} resizeMode="contain" />
              </View>
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>ดูทั้งหมด</Text>
            </TouchableOpacity>
          </View>

          {/* Recommended Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>แนะนำสำหรับคุณ</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>ดูทั้งหมด →</Text>
              </TouchableOpacity>
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterTabs}>
              <TouchableOpacity style={styles.filterTab}>
                <Text style={styles.filterTabText}>ดูทั้งหมด</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterTab, styles.filterTabActive]}>
                <Text style={[styles.filterTabText, styles.filterTabTextActive]}>Checkpoint</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterTab}>
                <Text style={styles.filterTabText}>Checkpoint</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterTab}>
                <Text style={styles.filterTabText}>Checkpoint</Text>
              </TouchableOpacity>
            </View>

            {/* Place Cards */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.placeScroll}>
              {[1, 2, 3, 4].map((item) => (
                <View key={item} style={styles.placeCard}>
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>Place {item}</Text>
                  </View>
                  <View style={styles.placeInfo}>
                    <Text style={styles.placeCheckpoint}>🐾 Checkpoint</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Promotion Banner */}
          <View style={styles.promotionBanner}>
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>ใช้วันนี้และรับคืนเป็น</Text>
              <TouchableOpacity style={styles.promoButton}>
                <Text style={styles.promoButtonText}>ดูของรางวัลทั้งหมด</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.promoRewards}>
              <Text style={styles.promoRewardIcon}>📚</Text>
              <Text style={styles.promoRewardIcon}>🐻</Text>
              <Text style={styles.promoRewardIcon}>😊</Text>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIconActive}>🏠</Text>
            <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🎁</Text>
            <Text style={styles.navLabel}>Reward</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navCenterIcon}>
              <Text style={styles.navCenterIconText}>🐻</Text>
            </View>
            <Text style={styles.navLabel}>Scout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🐾</Text>
            <Text style={styles.navLabel}>Paw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>👤</Text>
            <Text style={styles.navLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F5F1E8",
  },
  safe: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Top Bar
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  topBarLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3D2817",
  },
  level: {
    fontSize: 11,
    color: "#8B7355",
  },
  topBarCenter: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 40,
  },
  topBarRight: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
    justifyContent: "flex-end",
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconPaw: { fontSize: 18 },
  iconBag: { fontSize: 18 },
  iconBell: { fontSize: 18 },

  // Hero Banner
  heroBanner: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: "#FBF8F3",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#8B5A3C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    position: "relative",
    overflow: "visible",
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3D2817",
    marginBottom: 4,
    lineHeight: 30,
  },
  heroSubtitle: {
    fontSize: 11,
    color: "#8B7355",
    marginBottom: 16,
  },
  heroButton: {
    alignSelf: "flex-start",
  },
  heroButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  heroButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  heroButtonArrow: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  heroBear: {
    width: 140,
    height: 180,
    position: "absolute",
    right: 10,
    top: -20,
  },

  // Main Menu
  mainMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  menuItem: {
    alignItems: "center",
    width: 80,
  },
  menuIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  menuIconText: {
    fontSize: 28,
  },
  menuLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#3D2817",
    textAlign: "center",
  },
  menuSublabel: {
    fontSize: 9,
    color: "#8B7355",
    textAlign: "center",
  },

  // Section
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3D2817",
  },
  seeAll: {
    fontSize: 12,
    color: "#8B7355",
  },

  // Mission
  mapImage: {
    width: "100%",
    height: 140,
    borderRadius: 16,
  },
  missionLabel: {
    fontSize: 12,
    color: "#8B7355",
    marginTop: 8,
  },

  // Friends
  friendsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  friendCard: {
    flex: 1,
    aspectRatio: 0.75,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  friendImage: {
    width: "100%",
    height: "100%",
  },
  viewAllButton: {
    backgroundColor: "#F4C542",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  viewAllButtonText: {
    color: "#3D2817",
    fontSize: 13,
    fontWeight: "700",
  },

  // Filter Tabs
  filterTabs: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5DCC8",
  },
  filterTabActive: {
    backgroundColor: "#8B5A3C",
    borderColor: "#8B5A3C",
  },
  filterTabText: {
    fontSize: 11,
    color: "#8B7355",
    fontWeight: "600",
  },
  filterTabTextActive: {
    color: "#FFFFFF",
  },

  // Place Cards
  placeScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  placeCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  placeholderImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#E5DCC8",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 14,
    color: "#8B7355",
  },
  placeInfo: {
    padding: 12,
  },
  placeCheckpoint: {
    fontSize: 11,
    color: "#8B7355",
  },

  // Promotion Banner
  promotionBanner: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: "#FFF9E6",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F4C542",
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3D2817",
    marginBottom: 8,
  },
  promoButton: {
    backgroundColor: "#8B5A3C",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  promoButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
  promoRewards: {
    flexDirection: "row",
    gap: 8,
  },
  promoRewardIcon: {
    fontSize: 32,
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingBottom: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  navIcon: {
    fontSize: 24,
    opacity: 0.5,
  },
  navIconActive: {
    fontSize: 24,
  },
  navCenterIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#8B5A3C",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  navCenterIconText: {
    fontSize: 28,
  },
  navLabel: {
    fontSize: 10,
    color: "#8B7355",
    opacity: 0.7,
  },
  navLabelActive: {
    color: "#8B5A3C",
    fontWeight: "600",
    opacity: 1,
  },
});
