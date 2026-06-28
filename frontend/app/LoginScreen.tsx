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
import { Ionicons } from "@expo/vector-icons";
import { COLORS, RADIUS } from "../constants/theme";

const { width: SW } = Dimensions.get("window");
const CARD_W = Math.min(SW * 0.84, 330);

const BG    = require("../assets/images/Background-Login-Page.png");
const DOG   = require("../assets/images/Dog-Login-Page.png");
const PANDA = require("../assets/images/Panda-Login-Page.png");
const CAT   = require("../assets/images/Cat-Login-Page.png");
const LOGO  = require("../assets/images/Main-Logo.png");

const CHAR_W = 190; const CHAR_H = 190;
const DOG_W = 230; const DOG_H = 230;
const PANDA_W = 185; const PANDA_H = 185;
const CAT_W = 200; const CAT_H = 200;

const DOG_OVERHANG_X = 52;
const PANDA_OVERHANG_X = 36;
const TOP_CHAR_OVERLAP = 70;
const CAT_OVERLAP_TOP = 48;

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [loading, setLoading]       = useState(false);
  const [isLogin, setIsLogin]       = useState(false);
  const [showPass, setShowPass]     = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPass, setFocusPass]   = useState(false);

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

  const containerW = CARD_W + DOG_OVERHANG_X + PANDA_OVERHANG_X;
  const cardLeft   = DOG_OVERHANG_X;

  return (
    <ImageBackground source={BG} style={styles.root} resizeMode="cover">
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.kav}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo emblem */}
            <View style={styles.logoArea}>
              <Image source={LOGO} style={styles.logo} resizeMode="contain" />
            </View>

            {/* Characters + card block */}
            <View style={{ width: containerW, paddingTop: DOG_H - TOP_CHAR_OVERLAP, paddingBottom: CAT_H - CAT_OVERLAP_TOP, position: "relative" }}>

              {/* Dog — top left */}
              <Image source={DOG} style={{ position: "absolute", top: 0, left: 0, width: DOG_W, height: DOG_H, zIndex: 3 }} resizeMode="contain" />

              {/* Panda — top right */}
              <Image source={PANDA} style={{ position: "absolute", top: DOG_H - TOP_CHAR_OVERLAP - PANDA_H + 30, right: 0, width: PANDA_W, height: PANDA_H, zIndex: 3 }} resizeMode="contain" />

              {/* Card */}
              <View style={[styles.card, { width: CARD_W, marginLeft: cardLeft }]}>

                {/* Gold top stripe */}
                <View style={styles.cardStripe} />

                <View style={styles.cardBody}>
                  {/* Header */}
                  <Text style={styles.title}>
                    {isLogin ? "Welcome Back" : "Join the Expedition"}
                  </Text>
                  <Text style={styles.subtitle}>
                    {isLogin
                      ? "ยินดีต้อนรับกลับ — พร้อมออกสำรวจแล้วหรือยัง?"
                      : "สร้างบัญชีเพื่อเริ่มต้นการเดินทางสุดพิเศษ"}
                  </Text>

                  {/* Email field */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>
                      <Text style={styles.fieldDot}>· </Text>EMAIL
                    </Text>
                    <View style={[styles.inputWrap, focusEmail && styles.inputFocused]}>
                      <Ionicons name="mail-outline" size={15} color={focusEmail ? "#8B5A3C" : COLORS.grayLight} style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="your@email.com"
                        placeholderTextColor={COLORS.grayLight}
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => setFocusEmail(true)}
                        onBlur={() => setFocusEmail(false)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>
                  </View>

                  {/* Password field */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>
                      <Text style={styles.fieldDot}>· </Text>PASSWORD
                    </Text>
                    <View style={[styles.inputWrap, focusPass && styles.inputFocused]}>
                      <Ionicons name="lock-closed-outline" size={15} color={focusPass ? "#8B5A3C" : COLORS.grayLight} style={styles.inputIcon} />
                      <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="••••••••"
                        placeholderTextColor={COLORS.grayLight}
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => setFocusPass(true)}
                        onBlur={() => setFocusPass(false)}
                        secureTextEntry={!showPass}
                      />
                      <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                        <Ionicons name={showPass ? "eye-outline" : "eye-off-outline"} size={16} color={COLORS.grayLight} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Primary button */}
                  <TouchableOpacity
                    style={[styles.btnPrimary, loading && styles.btnDisabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                    activeOpacity={0.88}
                  >
                    {loading ? (
                      <ActivityIndicator color="#F4C542" />
                    ) : (
                      <>
                        <Text style={styles.btnPrimaryText}>
                          {isLogin ? "เข้าสู่ระบบ" : "ลงทะเบียน"}
                        </Text>
                        <View style={styles.btnArrow}>
                          <Ionicons name="arrow-forward" size={14} color="#2D1A0E" />
                        </View>
                      </>
                    )}
                  </TouchableOpacity>

                  {/* Divider */}
                  <View style={styles.dividerRow}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>หรือเข้าสู่ระบบด้วย</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* Google button */}
                  <TouchableOpacity style={styles.btnGoogle} onPress={handleGoogle} disabled={loading} activeOpacity={0.88}>
                    <Text style={styles.googleG}>G</Text>
                    <Text style={styles.btnGoogleText}>Continue with Google</Text>
                  </TouchableOpacity>

                  {/* Toggle */}
                  <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.toggleRow}>
                    <Text style={styles.toggleText}>
                      {isLogin ? "ยังไม่มีบัญชี? " : "มีบัญชีแล้ว? "}
                      <Text style={styles.toggleLink}>{isLogin ? "ลงทะเบียน" : "เข้าสู่ระบบ"}</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Cat — bottom left */}
              <Image source={CAT} style={{ position: "absolute", bottom: 0, left: 0, width: CAT_W, height: CAT_H, zIndex: 3 }} resizeMode="contain" />
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
  scroll: { flexGrow: 1, alignItems: "center", paddingTop: 28, paddingBottom: 40 },

  // Logo
  logoArea: { alignItems: "center", marginBottom: 16 },
  logo: { width: 160, height: 160 },
  appName: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "900",
    color: "#2D1A0E",
    letterSpacing: 4,
  },
  appTagline: {
    fontSize: 10.5,
    color: "#8B6340",
    letterSpacing: 1.4,
    marginTop: 3,
    fontStyle: "italic",
  },

  // Card
  card: {
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    zIndex: 1,
    shadowColor: "#6B4C2A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
  },
  cardStripe: { height: 4, backgroundColor: "#F4C542" },
  cardBody: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 22 },

  title: {
    fontSize: 21,
    fontWeight: "800",
    color: "#2D1A0E",
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11.5,
    color: COLORS.textLight,
    lineHeight: 18,
    marginBottom: 18,
  },

  // Fields
  fieldGroup: { marginBottom: 12 },
  fieldLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.gray,
    letterSpacing: 1.4,
    marginBottom: 6,
  },
  fieldDot: { color: "#F4C542", fontSize: 13 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF6EF",
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 12,
    height: 46,
  },
  inputFocused: {
    borderColor: "#8B5A3C",
    backgroundColor: "#FFF",
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 13, color: COLORS.text },
  eyeBtn: { paddingLeft: 8 },

  // Primary button
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2D1A0E",
    borderRadius: RADIUS.full,
    height: 50,
    marginTop: 4,
    shadowColor: "#2D1A0E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    gap: 10,
  },
  btnDisabled: { opacity: 0.55 },
  btnPrimaryText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  btnArrow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F4C542",
    alignItems: "center",
    justifyContent: "center",
  },

  // Divider
  dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 14 },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.inputBorder },
  dividerText: { marginHorizontal: 10, fontSize: 10, color: COLORS.gray },

  // Google
  btnGoogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: RADIUS.full,
    height: 46,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    gap: 8,
  },
  googleG: { fontSize: 16, fontWeight: "800", color: "#4285F4" },
  btnGoogleText: { fontSize: 13, fontWeight: "600", color: COLORS.text },

  // Toggle
  toggleRow: { alignItems: "center", marginTop: 14 },
  toggleText: { fontSize: 11.5, color: COLORS.textLight },
  toggleLink: { color: "#8B5A3C", fontWeight: "700" },
});
