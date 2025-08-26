export default defineAppConfig({
  ui: {
    selectMenu: {
      variants: {
        color: {
          primary: "#00C2A8",
          secondary: "",
          success: "",
          info: "",
          warning: "",
          error: "",
          neutral: "FAFAF9",
        },
      },
      defaultVariants: {
        size: "md",
        color: "primary",
        variant: "outline",
      },
    },
  },
});
