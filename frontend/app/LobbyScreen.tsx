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
const HERO_BANNER_BG = require("../assets/lobby/hero-banner-bg.png");
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
              <View style={styles.avatarContainer}>
                <Image source={AVATAR_BEAR} style={styles.avatar} />
              </View>
              <View>
                <Text style={styles.greeting}>สวัสดี, นักเดินทาง!</Text>
                <View style={styles.levelContainer}>
                  <Text style={styles.levelText}>Explorer</Text>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelBadgeText}>Lv.1</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.topBarCenter}>
              <Image source={LOGO} style={styles.logo} resizeMode="contain" />
            </View>
            <View style={styles.topBarRight}>
              <View style={styles.iconBtnWrapper}>
                <TouchableOpacity style={styles.iconBtn}>
                  <Text style={styles.iconText}>🐾</Text>
                </TouchableOpacity>
                <Text style={styles.iconLabel}>--</Text>
              </View>
              <View style={styles.iconBtnWrapper}>
                <TouchableOpacity style={styles.iconBtn}>
                  <Text style={styles.iconText}>🎒</Text>
                </TouchableOpacity>
                <Text style={styles.iconLabel}>--</Text>
              </View>
              <View style={styles.iconBtnWrapper}>
                <TouchableOpacity style={styles.iconBtn}>
                  <Text style={styles.iconText}>🔔</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Hero Banner */}
          <View style={styles.heroBanner}>
            <Image source={HERO_BANNER_BG} style={styles.heroBannerImage} resizeMode="cover" />
          </View>

          {/* Main Menu Icons */}
          <View style={styles.mainMenu}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>🐾</Text>
              </View>
              <Text style={styles.menuLabel}>ส่งตัว Scout</Text>
              <Text style={styles.menuSublabel}>ค้นหาเพื่อนพิเศษ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>🗺️</Text>
              </View>
              <Text style={styles.menuLabel}>สแกน AR</Text>
              <Text style={styles.menuSublabel}>เจอ Mascot</Text>
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
              <Text style={styles.menuSublabel}>กิจกรรมสนุกๆ</Text>
            </TouchableOpacity>
          </View>

          {/* Mission Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionIcon}>🚩</Text>
                <Text style={styles.sectionTitle}>ภารกิจพิเศษ</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAll}>ดูรายละเอียด →</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mapContainer}>
              <Image source={MAP_MISSION} style={styles.mapImage} resizeMode="cover" />
              <View style={styles.mapOverlay}>
                <Text style={styles.mapLabel}>🐾 Auto ~~ Checkpoint</Text>
              </View>
            </View>
          </View>

          {/* Friends Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionIcon}>👥</Text>
                <Text style={styles.sectionTitle}>เพื่อนร่วมทริปของคุณ</Text>
              </View>
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
              <Text style={styles.viewAllButtonText}>ดูภาพทั้งหมด</Text>
              <Text style={styles.viewAllButtonArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Recommended Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionIcon}>🐾</Text>
                <Text style={styles.sectionTitle}>แนะนำสำหรับคุณ</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAll}>ดูรายละเอียด →</Text>
              </TouchableOpacity>
            </View>

            {/* Place Cards */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.placeScroll}>
              <View style={styles.placeCard}>
                <View style={styles.placeImageContainer}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4' }}
                    style={styles.placeImage}
                  />
                </View>
                <View style={styles.placeInfo}>
                  <Text style={styles.placeLabel}>🐾 ~~ Checkpoint</Text>
                </View>
              </View>

              <View style={styles.placeCard}>
                <View style={styles.placeImageContainer}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19' }}
                    style={styles.placeImage}
                  />
                </View>
                <View style={styles.placeInfo}>
                  <Text style={styles.placeLabel}>🐾 ~~ Checkpoint</Text>
                </View>
              </View>

              <View style={styles.placeCard}>
                <View style={styles.placeImageContainer}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1528127269322-539801943592' }}
                    style={styles.placeImage}
                  />
                </View>
                <View style={styles.placeInfo}>
                  <Text style={styles.placeLabel}>🐾 ~~ Checkpoint</Text>
                </View>
              </View>

              <View style={styles.placeCard}>
                <View style={styles.placeImageContainer}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800' }}
                    style={styles.placeImage}
                  />
                </View>
                <View style={styles.placeInfo}>
                  <Text style={styles.placeLabel}>🐾 ~~ Checkpoint</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Promotion Banner */}
          <View style={styles.promotionBanner}>
            <View style={styles.promoLeft}>
              <Text style={styles.promoIcon}>💎</Text>
            </View>
            <View style={styles.promoCenter}>
              <Text style={styles.promoTitle}>ใช้วันนี้และรับคืนเป็น</Text>
              <TouchableOpacity style={styles.promoButton}>
                <Text style={styles.promoButtonText}>ดูของรางวัล</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.promoRight}>
              <View style={styles.promoRewards}>
                <Text style={styles.promoRewardIcon}>📚</Text>
                <Text style={styles.promoRewardIcon}>🐻</Text>
                <Text style={styles.promoRewardIcon}>😊</Text>
              </View>
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
            <Text style={styles.navLabel}>คู่หู Scout</Text>
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
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: "#D4A574",
    padding: 2,
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  greeting: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3D2817",
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  levelText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#3D2817",
  },
  levelBadge: {
    backgroundColor: "#F4C542",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  levelBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#3D2817",
  },
  topBarCenter: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 48,
  },
  topBarRight: {
    flexDirection: "row",
    gap: 6,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconBtnWrapper: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5DCC8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  iconText: {
    fontSize: 16,
  },
  iconLabel: {
    fontSize: 10,
    color: "#8B7355",
    fontWeight: "500",
  },

  // Hero Banner
  heroBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    aspectRatio: 2.2,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#8B5A3C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: "#FBF8F3",
  },
  heroBannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  carouselDots: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#D4A574",
    opacity: 0.5,
  },
  dotActive: {
    opacity: 1,
    backgroundColor: "#8B5A3C",
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Main Menu
  mainMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 12,
    marginTop: 24,
  },
  menuItem: {
    alignItems: "center",
    width: 78,
  },
  menuIcon: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIconText: {
    fontSize: 26,
  },
  menuLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#3D2817",
    textAlign: "center",
    marginBottom: 2,
  },
  menuSublabel: {
    fontSize: 8,
    color: "#8B7355",
    textAlign: "center",
  },

  // Section
  section: {
    marginTop: 28,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#3D2817",
  },
  seeAll: {
    fontSize: 11,
    color: "#8B7355",
    fontWeight: "500",
  },

  // Mission
  mapContainer: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#E5DCC8",
  },
  mapImage: {
    width: "100%",
    height: 150,
  },
  mapOverlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
  },
  mapLabel: {
    fontSize: 11,
    color: "#3D2817",
    fontWeight: "600",
    backgroundColor: "#FFFFFFDD",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  // Friends
  friendsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  friendCard: {
    flex: 1,
    aspectRatio: 0.72,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  friendImage: {
    width: "100%",
    height: "100%",
  },
  viewAllButton: {
    backgroundColor: "#F4C542",
    borderRadius: 22,
    paddingVertical: 11,
    paddingHorizontal: 28,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  viewAllButtonText: {
    color: "#3D2817",
    fontSize: 12,
    fontWeight: "700",
  },
  viewAllButtonArrow: {
    color: "#3D2817",
    fontSize: 14,
    fontWeight: "700",
  },

  // Place Cards
  placeScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  placeCard: {
    width: 140,
    marginRight: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  placeImageContainer: {
    width: "100%",
    height: 110,
    backgroundColor: "#E5DCC8",
  },
  placeImage: {
    width: "100%",
    height: "100%",
  },
  placeInfo: {
    padding: 10,
  },
  placeLabel: {
    fontSize: 10,
    color: "#8B7355",
    fontWeight: "500",
  },

  // Promotion Banner
  promotionBanner: {
    marginHorizontal: 16,
    marginTop: 28,
    backgroundColor: "#FFF9E6",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1.5,
    borderColor: "#F4C542",
  },
  promoLeft: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  promoIcon: {
    fontSize: 24,
  },
  promoCenter: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#3D2817",
    marginBottom: 6,
  },
  promoButton: {
    backgroundColor: "#8B5A3C",
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
  },
  promoButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  promoRight: {},
  promoRewards: {
    flexDirection: "row",
    gap: 6,
  },
  promoRewardIcon: {
    fontSize: 28,
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
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 3,
  },
  navIcon: {
    fontSize: 22,
    opacity: 0.4,
  },
  navIconActive: {
    fontSize: 22,
    opacity: 1,
  },
  navCenterIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#8B5A3C",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -28,
    shadowColor: "#8B5A3C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  navCenterIconText: {
    fontSize: 26,
  },
  navLabel: {
    fontSize: 9,
    color: "#8B7355",
    opacity: 0.6,
    fontWeight: "500",
  },
  navLabelActive: {
    color: "#8B5A3C",
    fontWeight: "600",
    opacity: 1,
  },
});
