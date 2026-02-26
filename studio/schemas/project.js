import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Proyecto',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Nombre del Proyecto',
            type: 'string',
            description: 'Ej: La Catalina, Almazara Club, etc.',
            validation: (Rule) => Rule.required().error('El nombre es obligatorio'),
        }),
        defineField({
            name: 'type',
            title: 'Tipo de Proyecto',
            type: 'string',
            description: 'Ej: Restaurante, Residencial, Cafetería, Tienda de Ropa, etc.',
            validation: (Rule) => Rule.required().error('El tipo es obligatorio'),
            options: {
                list: [
                    { title: 'Restaurante', value: 'Restaurante' },
                    { title: 'Residencial', value: 'Residencial' },
                    { title: 'Cafetería', value: 'Cafetería' },
                    { title: 'Tienda de Ropa', value: 'Tienda de Ropa' },
                    { title: 'Oficina', value: 'Oficina' },
                    { title: 'Salón de Celebraciones', value: 'Salón de Celebraciones' },
                    { title: 'Detalle Interior', value: 'Detalle Interior' },
                    { title: 'Oficina · Exposición', value: 'Oficina · Exposición' },
                ],
                // Permitir valores personalizados también
                layout: 'dropdown',
            },
        }),
        defineField({
            name: 'image',
            title: 'Foto del Proyecto',
            type: 'image',
            description: 'Sube la foto principal del proyecto. Tamaño recomendado: 1200x900px.',
            options: {
                hotspot: true, // Permite recortar la imagen visualmente
            },
            validation: (Rule) => Rule.required().error('La foto es obligatoria'),
        }),
        defineField({
            name: 'alt',
            title: 'Descripción de la Foto (SEO)',
            type: 'string',
            description: 'Texto alternativo para buscadores. Ej: "Restaurante La Catalina diseño interior"',
        }),
        defineField({
            name: 'objectPosition',
            title: 'Posición de la imagen',
            type: 'string',
            description: 'Opcional. Cómo se recorta la imagen. Ej: "center 60%". Déjalo vacío para centrado normal.',
            hidden: true, // Solo para usuarios avanzados
        }),
        defineField({
            name: 'order',
            title: 'Orden',
            type: 'number',
            description: 'Número para ordenar los proyectos. 1 = primero, 2 = segundo, etc.',
            validation: (Rule) => Rule.required().min(1),
            initialValue: 99,
        }),
    ],
    orderings: [
        {
            title: 'Orden de aparición',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'type',
            media: 'image',
        },
    },
})
