import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const LOGO = require("../../assets/lobby/logo.png");
const AVATAR_BEAR = require("../../assets/lobby/avatar-bear-new.png");

export default function TopBar() {
  return (
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
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialCommunityIcons name="paw" size={18} color="#8B5A3C" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="bag-outline" size={18} color="#8B5A3C" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={18} color="#8B5A3C" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#FFFFFF",
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: { width: "100%", height: "100%", borderRadius: 24 },
  greeting: { fontSize: 13, fontWeight: "600", color: "#3D2817" },
  levelContainer: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
  levelText: { fontSize: 11, fontWeight: "600", color: "#3D2817" },
  levelBadge: {
    backgroundColor: "#F4C542",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  levelBadgeText: { fontSize: 9, fontWeight: "700", color: "#3D2817" },
  topBarCenter: { flex: 1, alignItems: "center" },
  logo: { width: 120, height: 48 },
  topBarRight: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5EFE6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});
