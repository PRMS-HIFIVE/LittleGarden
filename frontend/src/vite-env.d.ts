/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENWEATHER_API_KEY: string;
    readonly VITE_PLANT_ID_API_KEY: string;
    readonly VITE_NONGSARO_API_KEY: string;
    readonly VITE_USE_MOCK_API?: string; // 'true' 또는 'false'
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
