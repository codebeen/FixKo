import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import BackButton from '@/components/ui/back-button';
import SectionHeader from '@/components/ui/section-header';
import Button from '@/components/ui/gradient-button';
import BaseMain from '@/components/layout/(base-main)/BaseMain';
import SERVICES_JSON from '@/data/Services.json';


// Centralized style and context mapping for all services
const SERVICE_THEMES: Record<string, { name: string; icon: string; color: string; primaryLabel: string; secondaryLabel: string }> = {
  carpenter: { name: 'Carpentry', icon: 'hammer', color: '#DBA92E', primaryLabel: 'Large Items / Build Tasks', secondaryLabel: 'Minor Repairs / Fixtures' },
  cleaning: { name: 'Cleaning', icon: 'broom', color: '#7EB1F1', primaryLabel: 'Bathroom', secondaryLabel: 'Bedroom' },
  painter: { name: 'Painting', icon: 'paint-roller', color: '#4ade80', primaryLabel: 'Full Rooms', secondaryLabel: 'Accent/Touch-up Walls' },
  electrician: { name: 'Electrical', icon: 'bolt', color: '#f87171', primaryLabel: 'Heavy Lines / Breakers', secondaryLabel: 'Fixtures / Outlets' },
  beauty: { name: 'Beauty', icon: 'cut', color: '#93c5fd', primaryLabel: 'Main Treatment Sessions', secondaryLabel: 'Add-on Pamper Packs' },
  ac_repair: { name: 'AC Repair', icon: 'snowflake', color: '#7EB1F1', primaryLabel: 'Split Type Units', secondaryLabel: 'Window Type Units' },
  plumbing: { name: 'Plumbing', icon: 'wrench', color: '#f87171', primaryLabel: 'Major Fixture Installs', secondaryLabel: 'Minor Leak Checks' },
  salon: { name: 'Salon', icon: 'user-tie', color: '#DBA92E', primaryLabel: 'Hair / Style Cuts', secondaryLabel: 'Color / Care Procedures' },
};

export default function BookingFormView() {
  const router = useRouter();

  // 1. Grab the dynamic parameters from the hook first
  const { serviceType, tierTitle, tierRate, tierDescription } = useLocalSearchParams<{
    serviceType: string;
    tierTitle: string;
    tierRate: string;
    tierDescription: string;
  }>();

  // 2. Normalize the string key to match both JSON and THEMES dictionary structures
  const currentServiceKey = serviceType?.toLowerCase() || 'cleaning';

  // 3. Look up the theme layout config safely using the single key reference
  const theme = SERVICE_THEMES[currentServiceKey] || SERVICE_THEMES.cleaning;

  // 4. Set up counter states, area inputs, and add-on selections
  const [primaryCount, setPrimaryCount] = useState(1);
  const [secondaryCount, setSecondaryCount] = useState(1);
  const [sqmValue, setSqmValue] = useState('30'); // Default starting value for area size calculation
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // 5. Look up localized add-ons from your central JSON file
  const availableAddons = (SERVICES_JSON as any)[currentServiceKey]?.addons || [];

  // Add-on selection toggle logic
  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // Helper function to extract the first base rate found in string configurations
  const parseBasePrice = (rateString: string | undefined): number => {
    if (!rateString) return 500;
    const numbers = rateString.replace(/,/g, '').match(/\d+/);
    return numbers ? parseInt(numbers[0], 10) : 500;
  };

  // Dynamic cost calculation block logic
  const isCleaning = currentServiceKey === 'cleaning';
  const sqmNumber = parseFloat(sqmValue) || 0;
  
  // Base rate calculation: Per sqm multiplier for cleaning, structural base flat rates for trades
  const baseRatePerSqm = parseBasePrice(tierRate); // Extracts 25, 30, or 40 out of your cleaning strings
  const basePrice = isCleaning ? baseRatePerSqm * sqmNumber : parseBasePrice(tierRate);

  // Calculate volume adjustment fees (Extra rooms/tasks)
  const counterMultiplierCost = (primaryCount - 1) * 200 + (secondaryCount - 1) * 150;

  // Calculate accumulated add-ons value sum
  const addonsCost = selectedAddons.reduce((sum, addonId) => {
    const selectedAddonData = availableAddons.find((a: any) => a.id === addonId);
    if (selectedAddonData) {
      const addonPriceMatch = selectedAddonData.meta.replace(/,/g, '').match(/\d+/);
      return sum + (addonPriceMatch ? parseInt(addonPriceMatch[0], 10) : 0);
    }
    return sum;
  }, 0);

  // Final summary addition computation
  const totalEstimatedCost = basePrice + counterMultiplierCost + addonsCost;

  const handleBookService = () => {
    router.push({
      // Points to your loading page or worker selection page route layout stack
      pathname: '/booking/LoadingPage' as any, 
      params: {
        serviceType: currentServiceKey,
        totalCost: totalEstimatedCost.toString(),
        tierTitle: tierTitle, 
        tierDescription: tierDescription, 
        primaryCount: primaryCount.toString(), 
        secondaryCount: secondaryCount.toString(),
        // Convert ['addon1', 'addon2'] -> "addon1,addon2" so the string parses perfectly over the URL tree
        selectedAddons: selectedAddons.join(','), 
      }
    });
  };

  return (
    <BaseMain>
      <BackButton />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <SectionHeader
          title="Book a Service"
          subtitle="Book with FixKo today and enjoy quick, dependable, and stress-free home services—all just a tap away."
          align="center"
        />

        {/* Dynamic Selected Service Tier Display Card */}
        <View className="flex-row items-center justify-between mt-6 gap-4">
          <View className="items-center justify-center flex-1">
            <FontAwesome5 name={theme.icon} size={36} color={theme.color} />
            <View 
              style={{ backgroundColor: theme.color }} 
              className="rounded-full py-1 px-3 mt-2 w-full items-center"
            >
              <Text className="text-white text-[11px] font-bold" numberOfLines={1}>
                {theme.name}
              </Text>
            </View>
          </View>

          <View className="flex-[2.5] bg-white rounded-2xl p-4 shadow-md">
            <Text className="text-brand-navy-deep text-[15px] font-bold mb-1">
              {tierTitle || 'Standard Package Allocation'}
            </Text>
            <Text className="text-gray-600 text-xs leading-4 mb-1.5">
              {tierDescription || 'Reliable single point system servicing package tailored to your direct residential space requests.'}
            </Text>
            <Text className="text-gray-900 text-[13px] font-semibold">
              Rate: {tierRate || 'Pricing on Consultation'}
            </Text>
          </View>
        </View>

        {/* Details Section */}
        <View className="mt-7">
          <Text className="text-white text-base font-bold">Fill out the details:</Text>
          
          {/* Dynamic Square Meter Input Field for Cleaning only */}
          {isCleaning && (
            <View className="mt-4 bg-white/10 rounded-xl p-4 border border-white/5">
              <Text className="text-white text-sm font-semibold mb-2">Estimated Property Size (sqm):</Text>
              <View className="flex-row items-center bg-black/20 rounded-lg px-3 border border-white/10">
                <TextInput
                  className="flex-1 h-11 text-white font-bold text-base"
                  keyboardType="numeric"
                  value={sqmValue}
                  onChangeText={setSqmValue}
                  placeholder="Enter property size"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                />
                <Text className="text-white/60 font-medium text-sm ml-2">sqm</Text>
              </View>
              <Text className="text-brand-yellow text-[11px] font-medium mt-1.5 opacity-90">
                Calculated at ₱{baseRatePerSqm} per square meter for this selection tier.
              </Text>
            </View>
          )}

          <Text className="text-white text-sm mt-5 opacity-90">Scope requirements:</Text>

          <View className="gap-4 mt-3">
            {/* Primary Context Counter Row */}
            <View className="flex-row items-center justify-between bg-white/10 rounded-xl py-3 px-4">
              <Text className="text-white text-sm font-medium flex-1 pr-2">{theme.primaryLabel}</Text>
              <View className="flex-row items-center gap-4">
                <TouchableOpacity 
                  className="bg-gray-100 w-9 h-9 rounded-full items-center justify-center" 
                  onPress={() => setPrimaryCount(Math.max(0, primaryCount - 1))}
                >
                  <Text className="text-gray-900 text-lg font-semibold -mt-0.5">–</Text>
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold w-6 text-center">{primaryCount}</Text>
                <TouchableOpacity 
                  className="bg-gray-100 w-9 h-9 rounded-full items-center justify-center" 
                  onPress={() => setPrimaryCount(primaryCount + 1)}
                >
                  <Text className="text-gray-900 text-lg font-semibold -mt-0.5">+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Secondary Context Counter Row */}
            <View className="flex-row items-center justify-between bg-white/10 rounded-xl py-3 px-4">
              <Text className="text-white text-sm font-medium flex-1 pr-2">{theme.secondaryLabel}</Text>
              <View className="flex-row items-center gap-4">
                <TouchableOpacity 
                  className="bg-gray-100 w-9 h-9 rounded-full items-center justify-center" 
                  onPress={() => setSecondaryCount(Math.max(0, secondaryCount - 1))}
                >
                  <Text className="text-gray-900 text-lg font-semibold -mt-0.5">–</Text>
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold w-6 text-center">{secondaryCount}</Text>
                <TouchableOpacity 
                  className="bg-gray-100 w-9 h-9 rounded-full items-center justify-center" 
                  onPress={() => setSecondaryCount(secondaryCount + 1)}
                >
                  <Text className="text-gray-900 text-lg font-semibold -mt-0.5">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Add-ons Section */}
        <View className="mt-7">
          <Text className="text-white text-lg font-bold mb-3.5">Suggested Add-ons</Text>
          
          {availableAddons.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
              {availableAddons.map((addon: any) => {
                const isChosen = selectedAddons.includes(addon.id);
                return (
                  <TouchableOpacity
                    key={addon.id}
                    activeOpacity={0.9}
                    onPress={() => toggleAddon(addon.id)}
                    // Explicitly uses your brand yellow (#DBA92E) with a 15% opacity fill (26) when highlighted
                    style={
                      isChosen 
                        ? { borderColor: '#DBA92E', backgroundColor: '#DBA92E26' } 
                        : { borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'transparent' }
                    }
                    className={`rounded-xl py-3.5 px-4 mr-2.5 w-[160px] h-[75px] justify-center border`}
                  >
                    {/* Kept text items clear and easily legible over the glassy dark background */}
                    <Text className={`text-xs font-bold ${isChosen ? 'text-white' : 'text-white/90'}`} numberOfLines={1}>
                      {addon.name}
                    </Text>
                    <Text className={`text-[11px] mt-0.5 ${isChosen ? 'text-white/70' : 'text-white/50'}`} numberOfLines={1}>
                      {addon.meta}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <View className="p-4 bg-white/5 rounded-xl border border-dashed border-white/10">
              <Text className="text-gray-400 text-xs italic text-center">
                No custom add-ons available for this selection.
              </Text>
            </View>
          )}
        </View>

        <View className="border-b border-white opacity-40 my-6" />

        {/* Cost Estimation Breakdown Display */}
        <View className="mb-6 items-center bg-white/5 border border-white/10 rounded-2xl p-5 mt-4">
          <Text className="text-white text-3xl font-extrabold tracking-tight">
            ₱{totalEstimatedCost.toLocaleString('en-US')}
          </Text>
          
          <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider mt-1.5">
            Estimated Pricing Total
          </Text>
          
          <View className="w-full border-t border-white/10 my-3.5" />
          
          <Text className="text-white/60 text-xs text-center leading-5 px-2">
            Includes a base {isCleaning ? 'area-size calculated' : ''} rate of <Text className="text-white font-semibold">₱{basePrice.toLocaleString('en-US')}</Text> 
            {counterMultiplierCost > 0 && (
              <> + <Text className="text-white font-semibold">₱{counterMultiplierCost}</Text> for extra room/task configurations</>
            )}
            {addonsCost > 0 && (
              <> + <Text className="text-white font-semibold">₱{addonsCost}</Text> for chosen custom add-on modifications</>
            )}
            . Final quote checked and settled on-site by the worker.
          </Text>
        </View>

        <View className="items-center w-full mt-2.5">
          <Button
            title="Confirm & Book Service"
            onPress={handleBookService}
          />
        </View>
      </ScrollView>
    </BaseMain>
  );
}