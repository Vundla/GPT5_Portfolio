import { Component, createSignal, JSX } from "solid-js";

interface Tab {
  id: string;
  label: string;
  icon?: JSX.Element;
  content: JSX.Element;
}

interface NavigationTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
}

const NavigationTabs: Component<NavigationTabsProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal(props.defaultTab || props.tabs[0]?.id || "");
  const [hoveredTab, setHoveredTab] = createSignal<string | null>(null);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    props.onTabChange?.(tabId);
  };

  return (
    <div class="navigation-tabs">
      <nav class="tabs-nav" role="tablist">
        {props.tabs.map((tab) => (
          <button
            role="tab"
            aria-selected={activeTab() === tab.id}
            class={`tab-button ${activeTab() === tab.id ? "active" : ""} ${hoveredTab() === tab.id ? "hovered" : ""}`}
            onClick={() => handleTabClick(tab.id)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {tab.icon && <span class="tab-icon">{tab.icon}</span>}
            <span class="tab-label">{tab.label}</span>
            <div class="tab-indicator" />
          </button>
        ))}
      </nav>

      <div class="tabs-content">
        {props.tabs.map((tab) => (
          <div
            role="tabpanel"
            class={`tab-panel ${activeTab() === tab.id ? "active" : ""}`}
            hidden={activeTab() !== tab.id}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;
