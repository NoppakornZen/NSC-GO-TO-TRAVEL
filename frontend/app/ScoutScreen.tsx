import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";

const SCOUTS = [
  {
    id: "hamster",
    name: "Hamster",
    active: true,
    character: require("../assets/scout/hamster-char.png"),
    banner: require("../assets/scout/banner-hamster.png"),
    description:
      "คู่นักเดินทางรอบด้าน ชอบสำรวจสถานที่ทั่วไป ทั้งแลนด์มาร์กยอดนิยม ตลาดท้องถิ่น วัดสวยๆ และจุดถ่ายรูปที่ไม่ควรพลาด พาไปได้ครบทุกสไตล์การเที่ยว",
    tags: ["สถานที่ทั่วไป", "แลนด์มาร์ก", "ชุมชนท้องถิ่น"],
  },
  {
    id: "otter",
    name: "Otter",
    active: false,
    character: require("../assets/scout/otter-char.png"),
    banner: require("../assets/scout/banner-otter.png"),
    description:
      "สายลุยตัวจริง ชอบเส้นทางที่ท้าทาย พาไปน้ำตก ธารน้ำ ถ้ำ เส้นทางเดินเขา และกิจกรรมผจญภัยสุดมันส์",
    tags: ["เส้นทางผจญภัย", "ธรรมชาติ", "กิจกรรมกลางแจ้ง"],
  },
  {
    id: "panda",
    name: "Panda",
    active: false,
    character: require("../assets/scout/panda-char.png"),
    banner: require("../assets/scout/banner-panda.png"),
    description:
      "ผู้เชี่ยวชาญด้านคาเฟ่และร้านอาหาร พาไปร้านเด็ด บรรยากาศดี คาเฟ่ซ่อนตัว ร้านอาหารอร่อยๆ และมุมพักผ่อนสุดชิล เติมความสุขระหว่างการเดินทาง",
    tags: ["คาเฟ่สวยๆ", "ร้านอาหาร", "ของอร่อย"],
  },
];

export default function ScoutScreen({ navigation }: any) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F1E8" />
      <SafeAreaView style={styles.safe}>
        <TopBar />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Page Header */}
          <View style={styles.pageHeader}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={22} color="#3D2817" />
            </TouchableOpacity>
            <View style={styles.pageTitleRow}>
              <MaterialCommunityIcons name="paw" size={20} color="#8B5A3C" />
              <Text style={styles.pageTitle}>คู่หู Scout</Text>
              <MaterialCommunityIcons name="paw" size={20} color="#8B5A3C" />
            </View>
            <Text style={styles.pageSubtitle}>เลือกคู่หูที่จะออกเดินทางและพาคุณไปค้นพบอะไรใหม่ๆ</Text>
          </View>

          {/* Scout Cards */}
          <View style={styles.cardsContainer}>
            {SCOUTS.map((scout) => (
              <View key={scout.id} style={styles.card}>
                {/* Banner background */}
                <Image
                  source={scout.banner}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                />

                {/* Dim overlay for locked cards */}
                {!scout.active && <View style={styles.lockedOverlay} />}

                {/* Character image — left side */}
                <Image
                  source={scout.character}
                  style={styles.characterImage}
                  resizeMode="contain"
                />

                {/* Text content — right side */}
                <View style={styles.cardContent}>
                  <Text style={styles.scoutName}>{scout.name}</Text>

                  <View style={[styles.badge, scout.active ? styles.badgeActive : styles.badgeLocked]}>
                    {scout.active ? (
                      <Ionicons name="checkmark" size={11} color="#FFF" />
                    ) : (
                      <Ionicons name="lock-closed" size={10} color="#FFF" />
                    )}
                    <Text style={styles.badgeText}>
                      {scout.active ? "กำลังใช้งาน" : "ยังไม่ปลดล็อก"}
                    </Text>
                  </View>

                  <Text style={styles.description} numberOfLines={4}>
                    {scout.description}
                  </Text>

                  <View style={styles.tagsRow}>
                    {scout.tags.map((tag) => (
                      <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Status icon — top right */}
                <View style={[styles.statusIcon, scout.active ? styles.statusActive : styles.statusLocked]}>
                  {scout.active ? (
                    <MaterialCommunityIcons name="paw" size={18} color="#FFF" />
                  ) : (
                    <Ionicons name="lock-closed" size={15} color="#8B7355" />
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Unlock banner */}
          <View style={styles.unlockBanner}>
            <MaterialCommunityIcons name="paw" size={16} color="#8B5A3C" />
            <Text style={styles.unlockText}>
              ปลดล็อกคู่หู Scout เพิ่มเติมด้วยการทำภารกิจและเก็บสะสมความทรงจำ
            </Text>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        <BottomNav navigation={navigation} activeTab="Scout" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F5F1E8" },
  safe: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  // Top Bar
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  topBarLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFF",
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: "hidden",
  },
  avatar: { width: "100%", height: "100%", borderRadius: 24 },
  greeting: { fontSize: 14, fontWeight: "700", color: "#3D2817" },
  levelContainer: { flexDirection: "row", alignItems: "center", gap: 6 },
  levelText: { fontSize: 12, color: "#8B7355" },
  levelBadge: {
    backgroundColor: "#F4C542",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  levelBadgeText: { fontSize: 10, fontWeight: "700", color: "#3D2817" },
  topBarCenter: { alignItems: "center" },
  logo: { width: 80, height: 36 },
  topBarRight: { flexDirection: "row", gap: 8, justifyContent: "flex-end" },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5EFE6",
    alignItems: "center",
    justifyContent: "center",
  },

  // Page Header
  pageHeader: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
    position: "relative",
  },
  backBtn: { position: "absolute", left: 16, top: 8 },
  pageTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  pageTitle: { fontSize: 22, fontWeight: "800", color: "#3D2817" },
  pageSubtitle: { fontSize: 13, color: "#8B7355", marginTop: 4, textAlign: "center" },

  // Cards
  cardsContainer: { paddingHorizontal: 16, gap: 16 },
  card: {
    height: 210,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#DDD4C4",
    backgroundColor: "#F5EFE6",
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(245,239,230,0.35)",
  },
  characterImage: {
    position: "absolute",
    left: -8,
    bottom: 0,
    width: 145,
    height: 225,
  },
  cardContent: {
    position: "absolute",
    left: 132,
    right: 0,
    top: 18,
    bottom: 12,
    paddingRight: 46,
  },
  scoutName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2D1A0E",
    marginBottom: 5,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  badgeActive: { backgroundColor: "#3D2817" },
  badgeLocked: { backgroundColor: "#3D2817" },
  badgeText: { fontSize: 11, color: "#FFF", fontWeight: "600" },
  description: { fontSize: 11.5, color: "#5A3E28", lineHeight: 17, marginBottom: 8 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 5 },
  tag: {
    backgroundColor: "rgba(255,250,240,0.85)",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  tagText: { fontSize: 10.5, color: "#5A3E28" },
  statusIcon: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  statusActive: { backgroundColor: "#E8A020" },
  statusLocked: { backgroundColor: "rgba(230,220,205,0.9)" },

  // Unlock Banner
  unlockBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "#EDE8E0",
    borderRadius: 14,
    padding: 14,
  },
  unlockText: { flex: 1, fontSize: 12, color: "#6B5340", lineHeight: 18 },

  // Bottom Nav
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#EDE8E0",
    paddingVertical: 8,
    paddingBottom: 16,
  },
  navItem: { flex: 1, alignItems: "center", gap: 2 },
  navLabel: { fontSize: 10, color: "#8B7355" },
  navLabelActive: { color: "#3D2817", fontWeight: "700" },
  navCenterIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#3D2817",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
