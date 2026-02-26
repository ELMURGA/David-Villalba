import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
    name: 'david-villalba',
    title: 'David Villalba - Gestión de Proyectos',

    // ⚠️ Project ID de sanity.io/manage
    projectId: 'bsgsllv5',
    dataset: 'production',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
})
