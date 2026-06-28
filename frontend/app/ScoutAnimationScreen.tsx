import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import TopBar from "./components/TopBar";

const { width: W } = Dimensions.get("window");

const FRAMES = [
  require("../assets/scout-animation/ezgif-frame-001.png"),
  require("../assets/scout-animation/ezgif-frame-002.png"),
  require("../assets/scout-animation/ezgif-frame-003.png"),
  require("../assets/scout-animation/ezgif-frame-004.png"),
  require("../assets/scout-animation/ezgif-frame-005.png"),
  require("../assets/scout-animation/ezgif-frame-006.png"),
  require("../assets/scout-animation/ezgif-frame-007.png"),
  require("../assets/scout-animation/ezgif-frame-008.png"),
  require("../assets/scout-animation/ezgif-frame-009.png"),
  require("../assets/scout-animation/ezgif-frame-010.png"),
  require("../assets/scout-animation/ezgif-frame-011.png"),
  require("../assets/scout-animation/ezgif-frame-012.png"),
  require("../assets/scout-animation/ezgif-frame-013.png"),
  require("../assets/scout-animation/ezgif-frame-014.png"),
  require("../assets/scout-animation/ezgif-frame-015.png"),
  require("../assets/scout-animation/ezgif-frame-016.png"),
  require("../assets/scout-animation/ezgif-frame-017.png"),
  require("../assets/scout-animation/ezgif-frame-018.png"),
  require("../assets/scout-animation/ezgif-frame-019.png"),
  require("../assets/scout-animation/ezgif-frame-020.png"),
  require("../assets/scout-animation/ezgif-frame-021.png"),
];

const DESTINATION_LABELS: Record<string, string> = {
  pattaya: "พัทยา",
  chiangmai: "เชียงใหม่",
  phuket: "ภูเก็ต",
};

const TIPS = [
  "Scout กำลังวิเคราะห์สถานที่ยอดนิยมในพื้นที่",
  "กำลังเลือกเส้นทางที่เหมาะกับสไตล์การเที่ยวของคุณ",
  "คัดสรรจุดแวะพักที่ดีที่สุดสำหรับทริปนี้",
];

const STEPS = ["เลือก Scout", "ค้นหา Route", "เริ่มเดินทาง"];

const DURATION_MS = 4000;
const FPS = 12;

export default function ScoutAnimationScreen({ navigation, route }: any) {
  const { scout, destination } = route?.params ?? {};
  const [frameIndex, setFrameIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const ringAnim = useRef(new Animated.Value(0.88)).current;
  const tipFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const frameInterval = setInterval(
      () => setFrameIndex((i) => (i + 1) % FRAMES.length),
      1000 / FPS
    );

    const tipInterval = setInterval(() => {
      Animated.timing(tipFade, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
        setTipIndex((i) => (i + 1) % TIPS.length);
        Animated.timing(tipFade, { toValue: 1, duration: 280, useNativeDriver: true }).start();
      });
    }, DURATION_MS / TIPS.length);

    Animated.timing(progress, { toValue: 1, duration: DURATION_MS, useNativeDriver: false }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.055, duration: 950, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 950, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(ringAnim, { toValue: 1.1, duration: 1500, useNativeDriver: true }),
        Animated.timing(ringAnim, { toValue: 0.88, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    const timer = setTimeout(() => {
      navigation.replace("RoutePreview", { scout, destination });
    }, DURATION_MS);

    return () => {
      clearInterval(frameInterval);
      clearInterval(tipInterval);
      clearTimeout(timer);
    };
  }, []);

  const barWidth = progress.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });
  const destName = DESTINATION_LABELS[destination] ?? destination ?? "จุดหมาย";

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEE7DA" />

      {/* Radial bg blob for depth */}
      <View style={styles.bgBlob} />

      <SafeAreaView style={styles.safe}>
        <TopBar />

        <View style={styles.content}>

          {/* Mission target badge */}
          <View style={styles.missionBadge}>
            <View style={styles.missionIconWrap}>
              <MaterialCommunityIcons name="crosshairs-gps" size={12} color="#F4C542" />
            </View>
            <Text style={styles.missionLabel}>เป้าหมายภารกิจ</Text>
            <View style={styles.divider} />
            <Text style={styles.missionDest}>{destName}</Text>
          </View>

          {/* Hero: character with rings */}
          <View style={styles.heroArea}>
            <Animated.View style={[styles.ring3, { transform: [{ scale: ringAnim }] }]} />
            <Animated.View style={[styles.ring2, { transform: [{ scale: pulseAnim }] }]} />
            <View style={styles.ring1} />
            <View style={styles.characterCircle}>
              <View style={styles.frameContainer}>
                {FRAMES.map((src, i) => (
                  <Image
                    key={i}
                    source={src}
                    style={[styles.frame, { opacity: i === frameIndex ? 1 : 0 }]}
                    resizeMode="cover"
                  />
                ))}
              </View>
            </View>
            <View style={[styles.floatPaw, { top: 14, left: 18 }]}>
              <MaterialCommunityIcons name="paw" size={11} color="#F4C542" style={{ opacity: 0.55 }} />
            </View>
            <View style={[styles.floatPaw, { bottom: 10, right: 10 }]}>
              <MaterialCommunityIcons name="paw" size={17} color="#C4A882" style={{ opacity: 0.45 }} />
            </View>
            <View style={[styles.floatPaw, { top: 32, right: 22 }]}>
              <MaterialCommunityIcons name="paw" size={8} color="#F4C542" style={{ opacity: 0.35 }} />
            </View>
          </View>

          {/* Title */}
          <View style={styles.titleBlock}>
            <Text style={styles.titleTop}>SCOUT</Text>
            <Text style={styles.titleSub}>กำลังออกสำรวจ</Text>
          </View>

          {/* Mission briefing card — dark, game-UI feel */}
          <View style={styles.briefingCard}>
            <View style={styles.briefingStripe} />
            <View style={styles.briefingBody}>
              <View style={styles.briefingHeadRow}>
                <Ionicons name="compass" size={13} color="#F4C542" />
                <Text style={styles.briefingHeadText}>รายงานสถานะ</Text>
              </View>
              <Animated.Text style={[styles.briefingText, { opacity: tipFade }]}>
                {TIPS[tipIndex]}
              </Animated.Text>
              <View style={styles.progressTrack}>
                <Animated.View style={[styles.progressFill, { width: barWidth }]}>
                  <View style={styles.progressSheen} />
                </Animated.View>
              </View>
            </View>
          </View>

          {/* Steps HUD */}
          <View style={styles.stepsRow}>
            {STEPS.map((step, i) => {
              const done = i <= 1;
              const active = i === 1;
              return (
                <React.Fragment key={step}>
                  <View style={styles.stepItem}>
                    <View style={[styles.stepNode, done && styles.stepNodeDone, active && styles.stepNodeActive]}>
                      {active ? (
                        <MaterialCommunityIcons name="magnify" size={11} color="#3D2817" />
                      ) : done ? (
                        <Ionicons name="checkmark" size={11} color="#FFF" />
                      ) : (
                        <View style={styles.stepDot} />
                      )}
                    </View>
                    <Text style={[styles.stepLabel, done && styles.stepLabelDone]}>{step}</Text>
                  </View>
                  {i < STEPS.length - 1 && (
                    <View style={[styles.stepConnector, i === 0 && styles.stepConnectorDone]} />
                  )}
                </React.Fragment>
              );
            })}
          </View>

        </View>
      </SafeAreaView>
    </View>
  );
}

const CHAR = 220;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#EEE7DA" },
  safe: { flex: 1 },
  bgBlob: {
    position: "absolute",
    width: W * 1.5,
    height: W * 1.5,
    borderRadius: W * 0.75,
    backgroundColor: "#E3D5C0",
    top: -W * 0.45,
    left: -W * 0.25,
    opacity: 0.55,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
    gap: 16,
  },

  missionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2D1A0E",
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  missionIconWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(244,197,66,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  missionLabel: { fontSize: 11, color: "#A08060", letterSpacing: 0.4 },
  divider: { width: 1, height: 13, backgroundColor: "rgba(160,128,96,0.4)" },
  missionDest: { fontSize: 13, fontWeight: "800", color: "#F4C542", letterSpacing: 0.5 },

  heroArea: {
    position: "relative",
    width: CHAR + 60,
    height: CHAR + 60,
    alignItems: "center",
    justifyContent: "center",
  },
  ring3: {
    position: "absolute",
    width: CHAR + 58,
    height: CHAR + 58,
    borderRadius: (CHAR + 58) / 2,
    borderWidth: 1,
    borderColor: "#F4C542",
    opacity: 0.14,
  },
  ring2: {
    position: "absolute",
    width: CHAR + 30,
    height: CHAR + 30,
    borderRadius: (CHAR + 30) / 2,
    borderWidth: 1.5,
    borderColor: "#F4C542",
    opacity: 0.32,
  },
  ring1: {
    position: "absolute",
    width: CHAR + 8,
    height: CHAR + 8,
    borderRadius: (CHAR + 8) / 2,
    backgroundColor: "#DDD0BA",
    opacity: 0.5,
  },
  characterCircle: {
    width: CHAR,
    height: CHAR,
    borderRadius: CHAR / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#F4C542",
    backgroundColor: "#EFE5D0",
    shadowColor: "#F4C542",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  frameContainer: { width: "100%", height: "100%" },
  frame: { width: "100%", height: "100%", position: "absolute" },
  floatPaw: { position: "absolute" },

  titleBlock: { alignItems: "center", gap: 1 },
  titleTop: {
    fontSize: 38,
    fontWeight: "900",
    color: "#3D2817",
    letterSpacing: 10,
    lineHeight: 40,
  },
  titleSub: {
    fontSize: 15,
    fontWeight: "600",
    color: "#8B5A3C",
    letterSpacing: 2.5,
  },

  briefingCard: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#2D1A0E",
    borderRadius: 16,
    overflow: "hidden",
  },
  briefingStripe: { width: 4, backgroundColor: "#F4C542" },
  briefingBody: { flex: 1, padding: 14, gap: 10 },
  briefingHeadRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  briefingHeadText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#F4C542",
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  briefingText: { fontSize: 13, color: "#C8B89A", lineHeight: 20 },
  progressTrack: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#F4C542",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressSheen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
  },

  stepsRow: { flexDirection: "row", alignItems: "center", width: "100%", paddingHorizontal: 8 },
  stepItem: { alignItems: "center", gap: 5 },
  stepConnector: { flex: 1, height: 2, backgroundColor: "#D0C4B0", marginBottom: 22, marginHorizontal: 6 },
  stepConnectorDone: { backgroundColor: "#F4C542" },
  stepNode: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#D0C4B0",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNodeDone: { backgroundColor: "#8B5A3C" },
  stepNodeActive: { backgroundColor: "#F4C542" },
  stepDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#A89880" },
  stepLabel: { fontSize: 10, color: "#A89880", fontWeight: "500" },
  stepLabelDone: { color: "#5A3E28", fontWeight: "700" },
});
