import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Housekeeping from '../../../assets/images/clean.png';
// import Construction from '../../../assets/images/repair.png';
// import Massage from '../../../assets/images/oil.png';
// import Garden from '../../../assets/images/plant-pot.png';
// import Plumbing from '../../../assets/images/water.png';
// import CarService from '../../../assets/images/vacuum.png';
// import Electrical from '../../../assets/images/light-bulb.png';
// import PetCare from '../../../assets/images/animals.png';
import SearchBar from '../../../components/search-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ServicesLandingScreen() {
    const router = useRouter();

    const leftServices = [
        { icon: 'hand-sparkles', label: 'Cleaning',     route: '/(services)/variation/CleaningServicePage' },
        { icon: 'hard-hat',      label: 'Construction', route: '/(services)/variation/ConstructionServicePage' },
        { icon: 'spa',           label: 'Massage',      route: '/(services)/variation/MassageServicePage' },
        { icon: 'seedling',          label: 'Gardening',    route: '/(services)/variation/GardeningServicePage' },
    ];

    const rightServices = [
        { icon: 'faucet',      label: 'Plumbing',   route: '/(services)/variation/PlumbingServicePage' },
        { icon: 'car',         label: 'Carwash',    route: '/(services)/variation/CarwashServicePage' },
        { icon: 'plug',        label: 'Electrical', route: '/(services)/variation/ElectricalServicePage' },
        { icon: 'paw',         label: 'Pet Care',   route: '/(services)/variation/PetCareServicePage' },
    ];

    const renderServiceBox = ({ icon, label, route }) => (
        <TouchableOpacity
            key={label}
            activeOpacity={0.7}
            onPress={() => router.push(route)}
            style={styles.servicesBoxWrapper}
        >
            <LinearGradient
                colors={['#f6f8fa', '#E8EEF8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.servicesBox}
            >
                <FontAwesome5 name={icon} size={36} color="#001851" />
                <Text style={styles.servicesText}>{label}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.heading}>Explore our Services</Text>

                <Text style={styles.subheading}>
                    Whether it's a quick repair or a full home service, FixKo connects you to trusted workers in just a few taps.
                </Text>

                <SearchBar />

                <View style={styles.servicesContainer}>
                    <View style={styles.column}>
                        {leftServices.map(renderServiceBox)}
                    </View>
                    <View style={styles.column}>
                        {rightServices.map(renderServiceBox)}
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={() => router.push('/(services)/variation/CleaningServicePage')}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#7AB1F5', '#0037B7']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>See more</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: '#001851',
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
    },

    heading: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    subheading: {
        color: 'white',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
    },

    servicesContainer: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 16,
    },

    column: {
        flex: 1,
        alignItems: 'center',
        gap: 10,
    },

    servicesBoxWrapper: {
        width: '90%',
        aspectRatio: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 4,
        borderRadius: 20,
    },

    servicesBox: {
        flex: 1,
        width: '100%',
        height: '50%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderRadius: 20,
        padding: 16,
        overflow: 'hidden',
    },

    icon: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },

    servicesText: {
        color: '#1a1a1a',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'left',
    },

    buttonWrapper: {
        marginTop: 4,
        marginBottom: 10,
    },

    button: {
        width: 150,
        padding: 15,
        alignItems: 'center',
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    buttonText: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
    },

});