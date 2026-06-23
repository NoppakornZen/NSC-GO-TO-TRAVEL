import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { COLORS, RADIUS } from "../constants/theme";

const { width: SW } = Dimensions.get("window");
const CARD_W = Math.min(SW * 0.82, 320);

const BG    = require("../assets/images/Background-Login-Page.png");
const DOG   = require("../assets/images/Dog-Login-Page.png");
const PANDA = require("../assets/images/Panda-Login-Page.png");
const CAT   = require("../assets/images/Cat-Login-Page.png");
const LOGO  = require("../assets/images/Logo-Login-Page.png");

// Character sizes (matching reference proportions)
const DOG_W   = 150;  const DOG_H   = 160;
const PANDA_W = 120;  const PANDA_H = 130;
const CAT_W   = 180;  const CAT_H   = 190;
const LOGO_S  = 100;

// How far characters hang outside card edges
const DOG_OVERHANG_X   = 40;
const PANDA_OVERHANG_X = 30;
const TOP_CHAR_OVERLAP = 50;
const CAT_OVERLAP_TOP  = 20;

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [isLogin, setIsLogin]   = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      navigation?.navigate("Home");
    } catch (e: any) {
      Alert.alert("เกิดข้อผิดพลาด", e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      navigation?.navigate("Home");
    } catch (e: any) {
      Alert.alert("เกิดข้อผิดพลาด", e.message);
    } finally {
      setLoading(false);
    }
  };

  // Container must be wide enough to fit card + overhanging characters
  const containerW = CARD_W + DOG_OVERHANG_X + PANDA_OVERHANG_X;

  // Card left offset within container
  const cardLeft = DOG_OVERHANG_X;

  return (
    <ImageBackground source={BG} style={styles.root} resizeMode="cover">
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.kav}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* ── Logo ── */}
            <View style={styles.logoArea}>
              <View style={styles.logoCircle}>
                <Image source={LOGO} style={styles.logo} resizeMode="cover" />
              </View>
              <Text style={styles.logoLabel}>Explore Now</Text>
            </View>

            {/* ── Main block: card + absolutely positioned characters ── */}
            <View
              style={{
                width: containerW,
                // top section: characters height minus overlap with card
                paddingTop: DOG_H - TOP_CHAR_OVERLAP,
                // bottom section: cat height minus overlap with card
                paddingBottom: CAT_H - CAT_OVERLAP_TOP,
                position: "relative",
              }}
            >
              {/* Dog — top left, hangs out left of card */}
              <Image
                source={DOG}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: DOG_W,
                  height: DOG_H,
                  zIndex: 3,
                }}
                resizeMode="contain"
              />

              {/* Panda — top right, hangs out right of card */}
              <Image
                source={PANDA}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: PANDA_W,
                  height: PANDA_H,
                  zIndex: 3,
                }}
                resizeMode="contain"
              />

              {/* Card */}
              <View
                style={[
                  styles.card,
                  {
                    width: CARD_W,
                    marginLeft: cardLeft,
                    zIndex: 1,
                  },
                ]}
              >
                <View style={styles.titleRow}>
                  <Text style={styles.title}>Join the Expedition</Text>
                  <Text style={styles.titleStar}> ✦</Text>
                </View>
                <Text style={styles.subtitle}>
                  Create an account to start collecting{"\n"}your travel companions.
                </Text>

                <Text style={styles.label}>EMAIL ADDRESS</Text>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.input}
                    placeholder="Gototravel@gmail.com"
                    placeholderTextColor={COLORS.grayLight}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <Text style={styles.label}>SECURITY KEY</Text>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor={COLORS.grayLight}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity
                  style={[styles.btnPrimary, loading && styles.btnDisabled]}
                  onPress={handleSubmit}
                  disabled={loading}
                  activeOpacity={0.85}
                >
                  {loading ? (
                    <ActivityIndicator color={COLORS.white} />
                  ) : (
                    <Text style={styles.btnPrimaryText}>
                      {isLogin ? "Log In" : "Register"} →
                    </Text>
                  )}
                </TouchableOpacity>

                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>Or continue with</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                  style={styles.btnGoogle}
                  onPress={handleGoogle}
                  disabled={loading}
                  activeOpacity={0.85}
                >
                  <Text style={styles.googleIcon}>G</Text>
                  <Text style={styles.btnGoogleText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setIsLogin(!isLogin)}
                  style={styles.toggleRow}
                >
                  <Text style={styles.toggleText}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <Text style={styles.toggleLink}>
                      {isLogin ? "Register" : "Log In"}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Cat — bottom left, hangs out left & overlaps card bottom */}
              <Image
                source={CAT}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: CAT_W,
                  height: CAT_H,
                  zIndex: 3,
                }}
                resizeMode="contain"
              />
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  kav:  { flex: 1 },
  scroll: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 40,
  },

  // ── Logo ──
  logoArea: { alignItems: "center", marginBottom: 12 },
  logoCircle: {
    width: LOGO_S,
    height: LOGO_S,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { width: LOGO_S, height: LOGO_S },
  logoLabel: {
    marginTop: 8,
    fontSize: 11,
    color: COLORS.textLight,
    letterSpacing: 1.8,
    fontStyle: "italic",
    fontWeight: "500",
  },

  // ── Card ──
  card: {
    backgroundColor: "rgba(255,255,255,0.90)",
    borderRadius: RADIUS.xl,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 24,
    shadowColor: "#6B4C2A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 10,
  },

  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  title: {
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.brownDark,
    letterSpacing: 0.1,
  },
  titleStar: { fontSize: 15, color: COLORS.gold },
  subtitle: {
    fontSize: 11,
    color: COLORS.textLight,
    marginBottom: 16,
    lineHeight: 17,
  },

  label: {
    fontSize: 9,
    fontWeight: "600",
    color: COLORS.gray,
    letterSpacing: 1,
    marginBottom: 5,
  },
  inputWrap: {
    backgroundColor: COLORS.inputBg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    marginBottom: 12,
    paddingHorizontal: 14,
    height: 44,
    justifyContent: "center",
  },
  input: { fontSize: 13, color: COLORS.text, height: 44 },

  btnPrimary: {
    backgroundColor: COLORS.brown,
    borderRadius: RADIUS.full,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    shadowColor: COLORS.brownDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  btnDisabled: { opacity: 0.6 },
  btnPrimaryText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.inputBorder },
  dividerText: { marginHorizontal: 10, fontSize: 10, color: COLORS.gray },

  btnGoogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
    height: 46,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    gap: 8,
  },
  googleIcon: { fontSize: 16, fontWeight: "700", color: "#4285F4" },
  btnGoogleText: { fontSize: 13, fontWeight: "600", color: COLORS.text },

  toggleRow: { alignItems: "center", marginTop: 14 },
  toggleText: { fontSize: 11, color: COLORS.textLight },
  toggleLink: { color: COLORS.brown, fontWeight: "700" },
});
