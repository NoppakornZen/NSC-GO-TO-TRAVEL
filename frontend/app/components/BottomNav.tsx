import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type Tab = "Home" | "Reward" | "Scout" | "Paw" | "Profile";

interface Props {
  navigation: any;
  activeTab: Tab;
}

export default function BottomNav({ navigation, activeTab }: Props) {
  const active = (tab: Tab) => tab === activeTab;

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
        <Ionicons name={active("Home") ? "home" : "home-outline"} size={22} color={active("Home") ? "#8B5A3C" : "#8B7355"} />
        <Text style={[styles.navLabel, active("Home") && styles.navLabelActive]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="gift-outline" size={22} color={active("Reward") ? "#8B5A3C" : "#8B7355"} />
        <Text style={[styles.navLabel, active("Reward") && styles.navLabelActive]}>Reward</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Scout")}>
        <View style={styles.navCenterIcon}>
          <MaterialCommunityIcons name="dog" size={26} color="#FFF" />
        </View>
        <Text style={[styles.navLabel, active("Scout") && styles.navLabelActive]}>คู่หู Scout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <MaterialCommunityIcons name="paw" size={22} color={active("Paw") ? "#8B5A3C" : "#8B7355"} />
        <Text style={[styles.navLabel, active("Paw") && styles.navLabelActive]}>Paw</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name={active("Profile") ? "person" : "person-outline"} size={22} color={active("Profile") ? "#8B5A3C" : "#8B7355"} />
        <Text style={[styles.navLabel, active("Profile") && styles.navLabelActive]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  navItem: { flex: 1, alignItems: "center", gap: 3 },
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
  navLabel: { fontSize: 9, color: "#8B7355", opacity: 0.6, fontWeight: "500" },
  navLabelActive: { color: "#8B5A3C", fontWeight: "600", opacity: 1 },
});
