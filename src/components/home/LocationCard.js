import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {Colors, Typography}from '../../theme';
import {useAddress} from '../../context/AddressContext';

const LocationCard = () => {
  const {address, hasAddress, setAddress} = useAddress();

  const [modalVisible, setModalVisible] = useState(false);
  const [draft, setDraft] = useState('');

  const openModal = () => {
    setDraft(address ?? '');
    setModalVisible(true);
  };

  const handleSave = () => {
    setAddress(draft);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
        onPress={openModal}>

        <View style={styles.locationIcon}>
          <Ionicons
            name="location"
            size={23}
            color={Colors.white}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.label}>
            Deliver to
          </Text>

          {/* No more hardcoded address — shows what the user actually
              set, or a clear call-to-action if they haven't yet. */}
          <Text
            style={[
              styles.address,
              !hasAddress && styles.addressPlaceholder,
            ]}
            numberOfLines={1}>

            {hasAddress ? address : 'Select delivery address'}

          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={23}
          color={Colors.text}
        />

      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>

        <View style={styles.modalOverlay}>

          <View style={styles.modalCard}>

            <Text style={styles.modalTitle}>
              Delivery address
            </Text>

            <Text style={styles.modalSubtitle}>
              Enter the address you want your groceries delivered to.
            </Text>

            <View style={styles.inputWrap}>
              <Ionicons
                name="location-outline"
                size={19}
                color={Colors.textLight}
                style={{marginRight: 8}}
              />
              <TextInput
                style={styles.input}
                value={draft}
                onChangeText={setDraft}
                placeholder="e.g. 123 Green Park, New Delhi"
                placeholderTextColor={Colors.textLight}
                autoFocus
                multiline
              />
            </View>

            <View style={styles.modalActions}>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  !draft.trim() && styles.saveButtonDisabled,
                ]}
                disabled={!draft.trim()}
                onPress={handleSave}>
                <Text style={styles.saveText}>Save address</Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>
    </>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#DDF7E2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    marginTop: 15,
  },

  locationIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    marginLeft: 10,
  },

  label: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: '600',
  },

  address: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '700',
    marginTop: 1,
  },

  addressPlaceholder: {
    color: Colors.textSecondary,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },

  modalCard: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 22,
    paddingBottom: 32,
  },

  modalTitle: {
    ...Typography.h3,
    fontSize: 19,
    fontWeight: '800',
    color: Colors.text,
  },

  modalSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
  },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 60,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },

  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },

  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },

  saveButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonDisabled: {
    opacity: 0.5,
  },

  saveText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
});