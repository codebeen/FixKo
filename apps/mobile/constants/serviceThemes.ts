export interface ServiceThemeDetail {
    name: string;
    icon: string;
    primaryIcon: string;
    secondaryIcon: string;
    providerLabel: string;
    color?: string; 
    primaryLabel: string;  
    secondaryLabel: string; 
}

export const SERVICE_THEMES: Record<string, ServiceThemeDetail> = {
    carpenter: { 
        name: 'Carpentry', icon: 'hammer', primaryIcon: 'boxes', secondaryIcon: 'tools', providerLabel: 'Carpenter', color: '#DBA92E',
        primaryLabel: 'Large Items / Build Tasks', secondaryLabel: 'Minor Repairs / Fixtures' 
    },
    cleaning: { 
        name: 'Cleaning', icon: 'broom', primaryIcon: 'bath', secondaryIcon: 'bed', providerLabel: 'Cleaner', color: '#7EB1F1',
        primaryLabel: 'Bathroom', secondaryLabel: 'Bedroom' 
    },
    painter: { 
        name: 'Painting', icon: 'paint-roller', primaryIcon: 'layer-group', secondaryIcon: 'paint-brush', providerLabel: 'Painter', color: '#4ade80',
        primaryLabel: 'Full Rooms', secondaryLabel: 'Accent/Touch-up Walls' 
    },
    electrician: { 
        name: 'Electrical', icon: 'bolt', primaryIcon: 'plug', secondaryIcon: 'charging-station', providerLabel: 'Electrician', color: '#f87171',
        primaryLabel: 'Heavy Lines / Breakers', secondaryLabel: 'Fixtures / Outlets' 
    },
    beauty: { 
        name: 'Beauty', icon: 'cut', primaryIcon: 'spa', secondaryIcon: 'heart', providerLabel: 'Beautician', color: '#93c5fd',
        primaryLabel: 'Main Treatment Sessions', secondaryLabel: 'Add-on Pamper Packs' 
    },
    ac_repair: { 
        name: 'AC Repair', icon: 'snowflake', primaryIcon: 'wind', secondaryIcon: 'wrench', providerLabel: 'AC Technician', color: '#7EB1F1',
        primaryLabel: 'Split Type Units', secondaryLabel: 'Window Type Units' 
    },
    plumbing: { 
        name: 'Plumbing', icon: 'wrench', primaryIcon: 'tint', secondaryIcon: 'shield-alt', providerLabel: 'Plumber', color: '#f87171',
        primaryLabel: 'Major Fixture Installs', secondaryLabel: 'Minor Leak Checks' 
    },
    salon: { 
        name: 'Salon', icon: 'user-tie', primaryIcon: 'cut', secondaryIcon: 'spray-can', providerLabel: 'Stylist', color: '#DBA92E',
        primaryLabel: 'Hair / Style Cuts', secondaryLabel: 'Color / Care Procedures' 
    },
};