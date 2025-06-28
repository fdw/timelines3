# Timeline Visualization Architecture

## Overview

This document outlines the architecture for a timeline visualization application that displays historical events in chronological order. The visualization emphasizes the temporal relationships between events, using a horizontal timeline axis where an event's x-coordinate corresponds to the year it occurred.

## Core Requirements

- Display events on a horizontal timeline based on their dates
- Represent events/people as rectangles with start/end dates determining position
- Implement vertical staggering to prevent overlapping events
- Include background grid lines for year markers
- Make the visualization horizontally scrollable
- Load JSON data on demand
- Implement each visual element as a React component within an SVG

## Component Architecture

### High-Level Components

```
App
├── TimelineContainer
│   ├── TimelineControls
│   ├── TimelineVisualization
│   │   ├── TimelineAxis
│   │   ├── TimelineGrid
│   │   ├── EventsLayer
│   │   │   ├── EventItem (multiple)
│   │   │   └── PersonItem (multiple)
│   │   └── TimelineMarkers
│   └── TimelineLegend
└── DataLoader
```

### Component Descriptions

1. **App**: The root component that orchestrates the entire application.

2. **TimelineContainer**: Manages the overall timeline view, including scrolling behavior and viewport calculations.
   - Handles horizontal scrolling
   - Manages the visible time range
   - Coordinates between controls and visualization

3. **TimelineControls**: Provides user interface elements for controlling the timeline.
   - Zoom controls
   - Time period selection
   - Filter options for event types
   - Search functionality

4. **TimelineVisualization**: The main SVG container for all visual elements.
   - Manages the coordinate system
   - Handles the transformation of time to pixel coordinates
   - Contains all visual layers

5. **TimelineAxis**: Renders the time axis with year labels.
   - Displays year markers at appropriate intervals
   - Adjusts density based on zoom level

6. **TimelineGrid**: Renders vertical grid lines for year markers.
   - Creates vertical lines at regular intervals
   - Provides visual reference for time periods

7. **EventsLayer**: Container for all event and person items.
   - Manages the vertical positioning algorithm
   - Handles event grouping and relationships

8. **EventItem**: Represents a single historical event.
   - Renders as a rectangle with start/end dates
   - Displays event title and optional details
   - Handles user interactions (click, hover)

9. **PersonItem**: Represents a person's lifetime.
   - Similar to EventItem but with specific styling for people
   - Shows birth and death dates as rectangle boundaries

10. **TimelineMarkers**: Displays significant time markers or periods.
    - Highlights important eras or periods
    - Provides context for events

11. **TimelineLegend**: Displays a legend explaining the visual elements.
    - Shows color coding for different event types
    - Provides a key for symbols and visual indicators

12. **DataLoader**: Handles data fetching and processing.
    - Loads JSON data on demand
    - Processes and formats data for visualization
    - Implements caching for performance

## Data Flow

1. **Data Loading**:
   - JSON data is loaded through the DataLoader component
   - Data can be loaded in chunks based on the visible time period
   - Loaded data is processed and normalized

2. **State Management**:
   - Timeline state (visible range, zoom level) is managed in TimelineContainer
   - Event data is passed down to EventsLayer
   - User interactions update the state and trigger re-renders

3. **Rendering Flow**:
   - TimelineContainer determines the visible time range
   - TimelineVisualization transforms time to pixel coordinates
   - EventsLayer positions events using the staggering algorithm
   - Individual EventItems and PersonItems render based on their calculated positions

## Event Positioning Algorithm

To prevent overlapping events, a vertical staggering algorithm will be implemented:

1. Sort all events by start date
2. For each event:
   - Find the lowest available vertical position where the event doesn't overlap with already positioned events
   - Assign this position to the event
   - Mark the horizontal space as occupied for the duration of the event

This can be optimized by:
- Using a sweep line algorithm to efficiently find available positions
- Implementing a row-based approach where events are assigned to rows
- Grouping related events to maintain visual relationships

## Data Structure

The timeline visualization uses a unified data model for all types of events. For a detailed description of the data model, please refer to [Data Model Documentation](datamodel.md).

### Summary

The data model defines three primary types of timeline entities:

1. **Milestone** - Events that happen at a specific point in time
2. **Period** - Events that span a duration of time
3. **Lifetime** - A special case of Period specifically for representing people

The model supports nested events through direct containment, where parent entities contain their children directly rather than through references.

```typescript
interface TimelineEntity {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO format date
  endDate?: string;  // ISO format date (required for Period and Lifetime; optional for Milestone)
  type: 'Milestone' | 'Period' | 'Lifetime';
  children: TimelineEntity[]; // Directly contains child entities
  tags: string[]; // Required metadata for filtering/categorization
  importance?: number; // For visual emphasis
}
```

## Rendering Approach

The visualization will be implemented as a single SVG element containing all visual components:

1. **Coordinate System**:
   - X-axis: Time (years)
   - Y-axis: Vertical position for staggering events

2. **Scaling**:
   - Linear time scale mapping years to pixels
   - Adjustable zoom level to focus on specific periods

3. **Responsive Design**:
   - SVG viewBox for responsive scaling
   - Dynamic adjustment of detail level based on viewport size

4. **Performance Considerations**:
   - Render only events in the visible viewport
   - Use React.memo for pure components
   - Implement virtualization for large datasets

## Future Enhancements

1. **Interactive Features**:
   - Timeline navigation controls
   - Event details on hover/click

2. **Data Management**:
   - Filtering by event type, time period, or category
   - Search functionality
