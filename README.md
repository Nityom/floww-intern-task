# Task Dashboard

A modern, responsive user dashboard built with React, Next.js, and Tailwind CSS. Features profile management, task tracking, and real-time statistics with a clean, intuitive interface.

## 🚀 Features

- **Profile Management**: Editable user profile with avatar upload/URL support
- **Task Management**: Interactive task list with completion tracking
- **Real-time Statistics**: Dynamic metrics showing task completion rates
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Modern UI**: Clean design using shadcn/ui components
- **Image Handling**: Support for both URL links and file uploads (max 5MB)

## 🛠️ Tech Stack

### Core Technologies
- **React 18** - Component-based UI library
- **Next.js 15** - Full-stack React framework with App Router
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework

### UI Components
- **shadcn/ui** - High-quality, accessible React components
- **Lucide React** - Beautiful, customizable icons
- **Radix UI** - Unstyled, accessible UI primitives

### Development Tools
- **PostCSS** - CSS processing and optimization
- **ESLint** - Code linting and formatting
- **Class Variance Authority (CVA)** - Component variant management

## 📁 Project Structure

```
floww-intern-task/
├── .next/                     # Next.js build output
├── app/                       # Next.js App Router directory
│   ├── favicon.ico           # Application favicon
│   ├── globals.css           # Global styles and Tailwind configuration
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Home page (renders Dashboard)
├── components/               # Reusable React components
│   ├── ui/                   # Base UI components (shadcn/ui)
│   │   ├── avatar.tsx        # Avatar component
│   │   ├── badge.tsx         # Badge component
│   │   ├── button.tsx        # Button component
│   │   ├── card.tsx          # Card component
│   │   ├── checkbox.tsx      # Checkbox component
│   │   ├── input.tsx         # Input component
│   │   └── label.tsx         # Label component
├── lib/                      # Utility functions
│   └── utils.ts              # Common utility functions (cn helper)
├── public/                   # Static assets
├── dashboard.tsx             # Main dashboard component
├── components.json           # shadcn/ui configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## 🔧 Key Components & Functions

### Main Dashboard Component (`dashboard.tsx`)

The core component that orchestrates the entire dashboard interface.

**Key State Management:**
- `user` - User profile information
- `tasks` - Task list with completion status
- `isEditing` - Profile edit mode toggle
- `editForm` - Form data for profile editing
- `previewImage` - Image preview during editing

**Key Functions:**

#### `handleTaskToggle(taskId: number)`
Toggles task completion status and updates statistics in real-time.

```typescript
const handleTaskToggle = (taskId: number) => {
  setTasks(tasks.map((task) => 
    task.id === taskId ? { ...task, completed: !task.completed } : task
  ))
}
```

#### `handleFileUpload(event: React.ChangeEvent<HTMLInputElement>)`
Processes image file uploads with validation and preview generation.

- Validates file type (images only)
- Checks file size (max 5MB)
- Converts to base64 for preview and storage
- Provides user feedback for invalid files

#### `handleImageUrlChange(url: string)`
Handles image URL input and updates preview in real-time.

#### `getPriorityColor(priority: string)`
Returns appropriate Tailwind classes based on task priority level.

### UI Components (`components/ui/`)

Pre-built, accessible components from shadcn/ui:

- **Avatar**: User profile pictures with fallback initials
- **Card**: Container components with header, content, and description
- **Button**: Interactive buttons with multiple variants
- **Input**: Form input fields with proper validation
- **Checkbox**: Task completion toggles
- **Badge**: Priority and status indicators
- **Label**: Accessible form labels

### Utility Functions (`lib/utils.ts`)

#### `cn(...inputs: ClassValue[])`
Combines and conditionally applies Tailwind CSS classes using clsx and tailwind-merge.

## 📊 Data Structure

### User Object
```typescript
interface User {
  id: number
  name: string
  email: string
  avatar: string
}
```

### Task Object
```typescript
interface Task {
  id: number
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  dueDate: string
}
```

## 🎨 Design System

### Color Scheme
- **Primary**: Blue tones for main actions and progress
- **Success**: Green for completed tasks and positive metrics
- **Warning**: Orange/Yellow for pending items and medium priority
- **Error**: Red for high priority and critical items
- **Neutral**: Gray scale for text and backgrounds

### Responsive Breakpoints
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (mixed layout)
- **Desktop**: > 1024px (multi-column grid)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nityom/floww-intern-task
   cd floww-intern-task
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🔄 State Management

The dashboard uses React's built-in state management with hooks:

- **useState**: Local component state for user data, tasks, and UI state
- **Controlled Components**: Form inputs with proper value binding
- **Derived State**: Statistics calculated from task completion status

## 🎯 Key Features Implementation

### Profile Picture Management
- **Dual Input Methods**: URL input or file upload
- **Image Validation**: File type and size checking
- **Live Preview**: Real-time image preview before saving
- **Error Handling**: User-friendly error messages

### Task Statistics
- **Real-time Updates**: Statistics recalculate when tasks change
- **Visual Progress**: Animated progress bar for completion rate
- **Color-coded Metrics**: Different colors for different metric types

### Responsive Design
- **Mobile-first**: Designed for mobile, enhanced for desktop
- **Flexible Grid**: CSS Grid with responsive breakpoints
- **Touch-friendly**: Appropriate sizing for mobile interactions

## 🔮 Future Enhancements

- **Backend Integration**: Connect to REST API or GraphQL
- **User Authentication**: Login/logout functionality
- **Task CRUD Operations**: Add, edit, delete tasks
- **Data Persistence**: Local storage or database integration
- **Dark Mode**: Theme switching capability
- **Drag & Drop**: Reorder tasks and file uploads
- **Notifications**: Task reminders and completion alerts

## 📝 Development Notes

### Code Organization
- Components are kept small and focused on single responsibilities
- TypeScript interfaces ensure type safety
- Tailwind classes are organized consistently
- Error boundaries could be added for production use

### Performance Considerations
- Images are converted to base64 for simplicity (consider cloud storage for production)
- State updates are optimized to prevent unnecessary re-renders
- Components use proper key props for list rendering

### Accessibility
- Semantic HTML elements used throughout
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly content
