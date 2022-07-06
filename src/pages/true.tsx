import React from "react";
import { Layout } from "antd";
import { ThemeProvider } from "../components/ThemeSwitcher/ThemeProvider";
import { SEO } from "../components/SEO";
import { TrueStory } from "../containers/TrueStory";
import { Footer } from "../containers/Footer";

const TrueStoryPage = () => (
  <ThemeProvider ignoreStored>
    <SEO title="BigFoot The Real Story" />
    <Layout>
      <TrueStory />
      <Footer />
    </Layout>
  </ThemeProvider>
);
export default TrueStoryPage;
