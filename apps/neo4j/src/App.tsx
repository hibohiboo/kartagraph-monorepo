import { BasicNvlWrapper, InteractiveNvlWrapper } from '@neo4j-nvl/react';

export function App() {
  return (
    <div style={{ width: '100%', height: 500 }}>
      <h1>Hello, world!</h1>
      <BasicNvlWrapper
        nvlOptions={{ initialZoom: 2 }}
        nodes={[{ id: '0' }, { id: '1' }]}
        rels={[{ id: '10', from: '0', to: '1' }]}
        nvlCallbacks={{ onLayoutDone: () => console.log('layout done') }}
      />
      <InteractiveNvlWrapper
        nvlOptions={{ useWebGL: false, initialZoom: 2.6 }}
        nodes={[
          { id: '0', caption: 'graphs' },
          { id: '1', caption: 'everywhere' },
        ]}
        rels={[{ from: '0', to: '1', id: '10', caption: 'are' }]}
        mouseEventCallbacks={{
          onZoom: true,
          onPan: true,
        }}
      />
    </div>
  );
}
