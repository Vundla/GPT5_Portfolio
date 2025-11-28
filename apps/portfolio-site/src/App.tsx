import type { Component } from 'solid-js';

const App: Component = () => {
  return (
    <>
      <header>
        <nav>
          <h1>GPT5 Portfolio</h1>
        </nav>
      </header>

      <main class="main-content">
        <section class="card">
          <h2>Welcome to GPT5 Portfolio</h2>
          <p>
            This portfolio features a stunning leopard print background theme
            that displays consistently across all pages, tabs, and dashboards.
          </p>
        </section>

        <section class="card">
          <h3>About the Theme</h3>
          <p>
            The leopard print background is applied globally to ensure a 
            cohesive visual experience throughout the entire application.
          </p>
        </section>

        <section class="dashboard card">
          <h3>Dashboard Section</h3>
          <p>
            Dashboard content with the leopard print theme visible in the background.
          </p>
          <button>Learn More</button>
        </section>

        <section class="tab-content card">
          <h3>Tab Content Example</h3>
          <p>
            This demonstrates how the background theme persists across 
            different sections and tab content areas.
          </p>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 GPT5 Portfolio. Leopard Print Theme.</p>
      </footer>
    </>
  );
};

export default App;
