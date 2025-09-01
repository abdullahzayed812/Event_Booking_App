import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  useGetEventByIdQuery,
  useRegisterForEventMutation,
} from '../../store/api/apiSlice';
import { addRegisteredEvent } from '../../store/slices/eventSlice';
import { RootState } from '../../store/store';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Icon from '../../components/Icon';

type EventDetailRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

const EventDetailScreen = () => {
  const route = useRoute<EventDetailRouteProp>();
  const { eventId } = route.params;
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { registeredEvents } = useSelector((state: RootState) => state.events);

  const { data: event, error, isLoading } = useGetEventByIdQuery(eventId);
  const [registerForEvent, { isLoading: isRegistering }] =
    useRegisterForEventMutation();

  const isRegistered = registeredEvents.includes(eventId);

  const handleRegister = async () => {
    if (!user) return;

    try {
      await registerForEvent({ eventId, userId: user.id });
      dispatch(addRegisteredEvent(eventId));
      Alert.alert(
        'Success',
        'You have successfully registered for this event!',
      );
      // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        'Unable to register for event. Please try again.',
      );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading event details...</Text>
      </View>
    );
  }

  if (error || !event) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load event details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: event.image }} style={styles.eventImage} />

      <View style={styles.content}>
        <Text style={styles.eventTitle}>{event.title}</Text>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Icon name="CalendarPlus" size={20} color="#007AFF" />
            <Text style={styles.infoText}>
              {new Date(event.date).toLocaleDateString()} at {event.time}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="MapPin" size={20} color="#007AFF" />
            <Text style={styles.infoText}>{event.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="Banknote" size={20} color="#007AFF" />
            <Text style={styles.infoText}>
              {event.price === 0 ? 'Free' : `$${event.price}`}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="Users" size={20} color="#007AFF" />
            <Text style={styles.infoText}>
              {event.availableSpots} of {event.capacity} spots available
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>

        {event.speakers && event.speakers.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Speakers</Text>
            {event.speakers.map((speaker, index) => (
              <View key={index} style={styles.speakerItem}>
                <Icon name="User" size={18} color="#666" />
                <Text style={styles.speakerName}>{speaker}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.registerButton,
            isRegistered && styles.registeredButton,
            (isRegistering || event.availableSpots === 0) &&
              styles.disabledButton,
          ]}
          onPress={handleRegister}
          disabled={isRegistering || isRegistered || event.availableSpots === 0}
        >
          <Text
            style={[
              styles.registerButtonText,
              isRegistered && styles.registeredButtonText,
            ]}
          >
            {isRegistering
              ? 'Registering...'
              : isRegistered
              ? 'Already Registered'
              : event.availableSpots === 0
              ? 'Event Full'
              : 'Register Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  eventImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    lineHeight: 32,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  speakerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  speakerName: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  registerButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  registeredButton: {
    backgroundColor: '#28a745',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registeredButtonText: {
    color: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
  },
});

export default EventDetailScreen;
