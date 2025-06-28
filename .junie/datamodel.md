# Timeline Data Model

## Overview

This document describes the data model for the timeline visualization application. The model is designed to represent various types of historical events and their relationships in a chronological timeline.

## Event Types

The data model defines three primary types of timeline entities:

1. **Milestone** - Events that happen at a specific point in time
   - Examples: Storming of the Bastille, launch of Apollo 5
   - Characteristics: Single date, no duration (or very short duration)

2. **Period** - Events that span a duration of time
   - Examples: World War 2, Arabian Spring, Renaissance, Space Race
   - Characteristics: Has both start and end dates, can contain nested events

3. **Lifetime** - A special case of Period specifically for representing people
   - Examples: Leonardo da Vinci, Queen Victoria
   - Characteristics: Represents a person's life from birth to death, can contain nested events

## Data Structure

The data model uses a single interface for all types of timeline entities:

```typescript
interface TimelineEntity {
  id: string
  title: string
  description?: string
  startDate: string // ISO format date
  endDate?: string // ISO format date (required for Period and Lifetime; optional for Milestone)
  type: 'Milestone' | 'Period' | 'Lifetime'
  children: TimelineEntity[] // Directly contains child entities, not just references
  tags: string[] // Required metadata for filtering/categorization
  importance?: number // For visual emphasis
}
```

## Key Design Decisions

### Single Model Approach

A unified `TimelineEntity` interface is used for all event types for several reasons:

1. **Simplicity**: A unified model is easier to understand, maintain, and use throughout the application
2. **Polymorphism**: All entities can be processed using the same code paths with type-specific behavior determined by the `type` field
3. **Nesting**: The containment hierarchy works naturally with a single model
4. **Consistency**: UI components can expect a consistent data structure regardless of the entity type

### Direct Containment vs. References

Children are directly contained within the parent entity rather than referenced by ID:

- Simplifies data access patterns (no need to look up references)
- Creates a clear hierarchical structure
- Makes it easier to serialize/deserialize the entire timeline

### No Parent References

Entities only know about their children, not their parents:

- Avoids circular references
- Simplifies the data model
- Maintains a clear parent-child hierarchy

### Required Tags

The `tags` field is required and replaces the previous `category` concept:

- Allows entities to belong to multiple categories
- Provides flexible filtering and grouping options
- Enables more powerful search capabilities

## Nesting Examples

### Example 1: Renaissance Period with Nested Entities

```json
{
  "id": "renaissance",
  "title": "Renaissance",
  "type": "Period",
  "startDate": "1400-01-01",
  "endDate": "1600-12-31",
  "tags": ["art", "history", "cultural-movement"],
  "children": [
    {
      "id": "leonardo",
      "title": "Leonardo da Vinci",
      "type": "Lifetime",
      "startDate": "1452-04-15",
      "endDate": "1519-05-02",
      "tags": ["artist", "inventor", "renaissance"],
      "children": [
        {
          "id": "mona-lisa",
          "title": "Completion of Mona Lisa",
          "type": "Milestone",
          "startDate": "1506-01-01",
          "tags": ["painting", "artwork"],
          "children": []
        }
      ]
    }
  ]
}
```

### Example 2: Space Race with Nested Events

```json
{
  "id": "space-race",
  "title": "Space Race",
  "type": "Period",
  "startDate": "1955-01-01",
  "endDate": "1975-12-31",
  "tags": ["space", "cold-war", "technology"],
  "children": [
    {
      "id": "sputnik",
      "title": "Sputnik 1 Launch",
      "type": "Milestone",
      "startDate": "1957-10-04",
      "tags": ["satellite", "soviet"],
      "children": []
    },
    {
      "id": "apollo-11",
      "title": "Apollo 11 Moon Landing",
      "type": "Milestone",
      "startDate": "1969-07-20",
      "tags": ["nasa", "moon-landing"],
      "children": []
    }
  ]
}
```

## Implementation Considerations

1. **Type Validation**: Ensure that Milestones don't have an `endDate` or have the same date for both `startDate` and `endDate`
2. **Rendering**: Different visual representations based on the `type` field
3. **Nesting Rules**: Consider whether all types can contain all other types (e.g., can a Milestone contain children?)
4. **Performance**: Direct containment might impact performance with very large datasets - consider lazy loading strategies