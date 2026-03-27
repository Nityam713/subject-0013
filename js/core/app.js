import { createStore } from "../state/store.js";
import { initEyeTracker } from "../modules/eye-tracker.js";
import { initBootScreen } from "../modules/boot-screen.js";
import { initScanText } from "../modules/scan-text.js";
import { initObserverBackground } from "../modules/observer-background.js";
import { initClinicalNavigation } from "../modules/clinical-navigation.js";
import { initMatrixTelemetry } from "../modules/matrix-telemetry.js";
import { initBiometricBar } from "../modules/biometric-bar.js";
import { initVoidOverlay } from "../modules/void-overlay.js";
import { initDecisionSimulator } from "../modules/decision-simulator.js";
import { initRiskModal } from "../modules/risk-modal.js";
import { initContentPages } from "../modules/content-pages.js";
import { initProfileInteractions } from "../modules/profile-interactions.js";
import { initNavTransition } from "../modules/nav-transition.js";

export function bootstrapApp() {
  var store = createStore({
    scrollDepth: 0,
    mouseSpeed: 0,
    startedAt: Date.now()
  });

  initBootScreen();
  initContentPages();
  initEyeTracker();
  initScanText();
  initObserverBackground(store);
  initClinicalNavigation();
  initMatrixTelemetry();
  initBiometricBar(store);
  initVoidOverlay();
  initDecisionSimulator();
  initRiskModal();
  initProfileInteractions();
  initNavTransition();
}
