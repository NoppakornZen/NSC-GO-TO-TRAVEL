import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";

const DESTINATIONS = [
  {
    id: "pattaya",
    name: "พัทยา",
    unlocked: true,
    keywords: ["pattaya", "พัทยา", "ทะเล", "ชลบุรี"],
    tags: ["ทะเล", "วัฒนธรรม", "อาหาร"],
    tagIcons: ["water-outline", "business-outline", "fast-food-outline"],
    image: { uri: "https://images.unsplash.com/photo-1625492206717-61c584a8b11e?w=800&q=80" },
  },
  {
    id: "chiangmai",
    name: "เชียงใหม่",
    unlocked: false,
    keywords: ["chiangmai", "chiang mai", "เชียงใหม่", "ภาคเหนือ"],
    tags: [],
    tagIcons: [],
    image: { uri: "https://images.unsplash.com/photo-1578157695179-d7b7ddeb2f53?w=800&q=80" },
  },
  {
    id: "phuket",
    name: "ภูเก็ต",
    unlocked: false,
    keywords: ["phuket", "ภูเก็ต", "ทะเลใต้", "ภาคใต้"],
    tags: [],
    tagIcons: [],
    image: { uri: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80" },
  },
];

export default function DestinationScreen({ navigation, route }: any) {
  const [search, setSearch] = useState("");
  const scout = route?.params?.scout ?? "hamster";

  const filtered = DESTINATIONS.filter((d) => {
    if (search === "") return true;
    const q = search.toLowerCase();
    return d.keywords.some((k) => k.toLowerCase().includes(q));
  });

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
              <Text style={styles.mapEmoji}>🗺️</Text>
              <Text style={styles.pageTitle}>เลือกจุดหมาย</Text>
              <MaterialCommunityIcons name="paw" size={20} color="#8B5A3C" />
            </View>
            <Text style={styles.pageSubtitle}>เลือกจังหวัดที่คุณอยากสำรวจกับ Scout</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color="#8B7355" />
            <TextInput
              style={styles.searchInput}
              placeholder="ค้นหาจังหวัด, สถานที่ หรือกิจกรรม..."
              placeholderTextColor="#B8A898"
              value={search}
              onChangeText={setSearch}
            />
            <Ionicons name="options-outline" size={18} color="#8B7355" />
          </View>

          {/* Destination Cards */}
          <View style={styles.cardsContainer}>
            {filtered.map((dest) => (
              <TouchableOpacity
                key={dest.id}
                disabled={!dest.unlocked}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("ScoutAnimation", { scout, destination: dest.id })}
                style={[styles.card, dest.unlocked && styles.cardUnlocked]}
              >
                <Image source={dest.image} style={styles.cardImage} resizeMode="cover" />

                {/* Gradient overlay */}
                <LinearGradient
                  colors={dest.unlocked
                    ? ["transparent", "rgba(45,26,14,0.75)"]
                    : ["rgba(80,55,35,0.45)", "rgba(45,26,14,0.82)"]}
                  style={StyleSheet.absoluteFill}
                />

                {/* Lock overlay */}
                {!dest.unlocked && (
                  <View style={styles.lockOverlay}>
                    <View style={styles.lockCircle}>
                      <Ionicons name="lock-closed" size={22} color="#FFF" />
                    </View>
                    <Text style={styles.lockText}>เร็วๆ นี้</Text>
                  </View>
                )}

                {/* Badge — unlocked only */}
                {dest.unlocked && (
                  <View style={styles.readyBadge}>
                    <MaterialCommunityIcons name="paw" size={13} color="#3D2817" />
                    <Text style={styles.readyBadgeText}>พร้อมสำรวจ</Text>
                  </View>
                )}

                {/* City name */}
                <Text style={[styles.cityName, !dest.unlocked && styles.cityNameLocked]}>
                  {dest.name}
                </Text>

                {/* Tags */}
                {dest.unlocked && (
                  <View style={styles.tagsRow}>
                    {dest.tags.map((tag, i) => (
                      <View key={tag} style={styles.tag}>
                        <Ionicons
                          name={dest.tagIcons[i] as any}
                          size={12}
                          color="#F5EFE6"
                        />
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 24 }} />
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

  pageHeader: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
    position: "relative",
  },
  backBtn: { position: "absolute", left: 16, top: 8 },
  pageTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  mapEmoji: { fontSize: 20 },
  pageTitle: { fontSize: 22, fontWeight: "800", color: "#3D2817" },
  pageSubtitle: { fontSize: 13, color: "#8B7355", marginTop: 4, textAlign: "center" },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#FFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 13, color: "#3D2817" },

  cardsContainer: { paddingHorizontal: 16, gap: 14 },
  card: {
    height: 190,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#DDD4C4",
  },
  cardUnlocked: {
    borderWidth: 2.5,
    borderColor: "#F4C542",
    shadowColor: "#F4C542",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: { ...StyleSheet.absoluteFillObject as any, width: "100%", height: "100%" },

  lockOverlay: {
    ...StyleSheet.absoluteFillObject as any,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  lockCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(45,26,14,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  lockText: { fontSize: 13, color: "#FFF", fontWeight: "600" },

  readyBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#F4C542",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  readyBadgeText: { fontSize: 12, fontWeight: "700", color: "#3D2817" },

  cityName: {
    position: "absolute",
    bottom: 48,
    left: 16,
    fontSize: 32,
    fontWeight: "900",
    color: "#FFF",
  },
  cityNameLocked: { bottom: 16, color: "rgba(255,255,255,0.7)" },

  tagsRow: {
    position: "absolute",
    bottom: 12,
    left: 12,
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(45,26,14,0.55)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: { fontSize: 11, color: "#F5EFE6", fontWeight: "500" },
});
