import { useReducedMotion, type MotionProps } from "framer-motion";

type PresetOptions = {
  enabled: MotionProps;
  disabled?: MotionProps;
};

const DEFAULT_DISABLED_PROPS: MotionProps = { initial: false };

export function useMotionPreset({ enabled, disabled = DEFAULT_DISABLED_PROPS }: PresetOptions): MotionProps {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion ? disabled : enabled;
}

export function useMotionPreference() {
  return useReducedMotion();
}


