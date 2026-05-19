import { Text, View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { cleaningIcon } from './icons';
import Housekeeping from '../../assets/images/Housekeeping.png';
import Construction from '../../assets/images/Construction.png';
import Massage from '../../assets/images/Massage.png';
import Garden from '../../assets/images/Garden.png';
import Plumbing from '../../assets/images/Plumbing.png';
import CarService from '../../assets/images/Car Service.png';
import Electrical from '../../assets/images/Electrical.png';
import PetCare from '../../assets/images/Pet Care.png';

export default function ServicesScreen() {
    return (
        <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#001851'}}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Explore our Services</Text>

                <Text style={{ color: 'white', textAlign: 'center', marginTop: 5 }}>
                    Whether it's a quick repair or a full home service, FixKo connects you to trusted workers in just a few taps.
                </Text>

                <View style={styles.servicesContainer}>
                
                    <View style={styles.leftContainer}>
                        
                        <View style={styles.servicesBox}>
                            <Image
                                source={Housekeeping}
                                style={{ width: 50, height: 50 }}
                            />

                            <Text style={styles.servicesText}>
                                Cleaning
                            </Text>
                        </View>

                        <View style={styles.servicesBox}>
                            <Image
                                source={Construction}
                                style={{ width: 50, height: 50 }}
                            />

                            <Text style={styles.servicesText}>
                                Construction
                            </Text>
                        </View>

                        <View style={styles.servicesBox}>
                            <Image
                                source={Massage}
                                style={{ width: 50, height: 50 }}
                            />


                            <Text style={styles.servicesText}>
                                Massage
                            </Text>
                        </View>

                        <View style={styles.servicesBox}>
                            <Image
                                source={Garden}
                                style={{ width: 50, height: 50 }}
                            />

                            <Text style={styles.servicesText}>
                                Gardening
                            </Text>
                        </View>

                    </View>

                    <View style={styles.rightContainer}>

                        <View style={styles.servicesBox}>
                            <Image
                                source={Plumbing}
                                style={{ width: 50, height: 50 }}
                            />

                            <Text style={styles.servicesText}>
                                Plumbing
                            </Text>
                        </View>

                        <View style={styles.servicesBox}>
                            <Image
                                source={CarService}
                                style={{ width: 50, height: 50 }}
                            />

                            <Text style={styles.servicesText}>
                                Carwash
                            </Text>
                        </View>

                        <View style={styles.servicesBox}>
                            <Image
                                source={Electrical}
                                style={{ width: 50, height: 50 }}
                            />


                            <Text style={styles.servicesText}>
                                Electrical
                            </Text>
                        </View>

                        <View style={styles.servicesBox}>
                            <Image
                                source={PetCare}
                                style={{ width: 50, height: 50 }}
                            />

                            <Text style={styles.servicesText}>
                                Pet Care
                            </Text>
                        </View>

                    </View>

                </View>


            </View>







            



            

            

            






        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    servicesContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        margin: 15,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
    }, 

    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 

    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    servicesBox: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,

        gap: 5,
        padding: 10,
        margin: 5,

    },

    servicesText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7AB1F5',
        borderRadius: 30,
        padding: 5,
        margin: 5,

        color: 'black',
        fontSize: 16,

    }



})
