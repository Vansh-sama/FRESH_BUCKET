import React, {useState} from 'react';

import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {useAddress} from '../../context/AddressContext';

import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
}from '../../theme';


const AddressPickerModal = ({
  visible,
  onClose,
}) => {

  const {
    address,
    setAddress,
  } = useAddress();


  const [value, setValue] = useState(address || '');


  const handleSave = () => {

    const trimmedAddress = value.trim();

    if (!trimmedAddress) {
      return;
    }

    setAddress(trimmedAddress);

    onClose();
  };


  const handleClose = () => {

    setValue(address || '');

    onClose();
  };


  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}>

      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>

        {/* BACKDROP */}

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />


        {/* MODAL */}

        <View style={styles.modal}>

          {/* HANDLE */}

          <View style={styles.handle} />


          {/* HEADER */}

          <View style={styles.header}>

            <View style={styles.headerLeft}>

              <View style={styles.locationIcon}>

                <Ionicons
                  name="location"
                  size={20}
                  color={Colors.primary}
                />

              </View>


              <View>

                <Text style={styles.title}>
                  Delivery address
                </Text>

                <Text style={styles.subtitle}>
                  Where should we deliver your groceries?
                </Text>

              </View>

            </View>


            <TouchableOpacity
              style={styles.closeButton}
              activeOpacity={0.75}
              onPress={handleClose}>

              <Ionicons
                name="close"
                size={20}
                color={Colors.text}
              />

            </TouchableOpacity>

          </View>


          {/* CURRENT ADDRESS */}

          {address ? (

            <View style={styles.currentAddress}>

              <View style={styles.currentAddressIcon}>

                <Ionicons
                  name="checkmark-circle"
                  size={17}
                  color={Colors.primary}
                />

              </View>


              <View style={styles.currentAddressContent}>

                <Text style={styles.currentAddressLabel}>
                  Current address
                </Text>

                <Text
                  style={styles.currentAddressText}
                  numberOfLines={2}>

                  {address}

                </Text>

              </View>

            </View>

          ) : null}


          {/* INPUT */}

          <Text style={styles.inputLabel}>
            Delivery address
          </Text>


          <View style={styles.inputContainer}>

            <Ionicons
              name="home-outline"
              size={19}
              color={Colors.textSecondary}
            />


            <TextInput
              value={value}
              onChangeText={setValue}
              placeholder="Enter your complete address"
              placeholderTextColor={Colors.textLight}
              style={styles.input}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              selectionColor={Colors.primary}
            />

          </View>


          {/* HELPER */}

          <View style={styles.helper}>

            <Ionicons
              name="information-circle-outline"
              size={15}
              color={Colors.textLight}
            />

            <Text style={styles.helperText}>
              Include your house number, street and locality.
            </Text>

          </View>


          {/* SAVE BUTTON */}

          <TouchableOpacity
            style={[
              styles.saveButton,
              !value.trim() && styles.saveButtonDisabled,
            ]}
            activeOpacity={0.85}
            disabled={!value.trim()}
            onPress={handleSave}>

            <Text style={styles.saveButtonText}>
              Save delivery address
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color={Colors.white}
            />

          </TouchableOpacity>


          {/* CANCEL */}

          <TouchableOpacity
            style={styles.cancelButton}
            activeOpacity={0.7}
            onPress={handleClose}>

            <Text style={styles.cancelText}>
              Cancel
            </Text>

          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>

    </Modal>
  );
};


export default AddressPickerModal;


/* ═══════════════════════════════════════════
   STYLES
═══════════════════════════════════════════ */

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },


  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },


  modal: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    ...Shadows.large,
  },


  handle: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: 18,
  },


  /* HEADER */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },


  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },


  locationIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },


  title: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.text,
  },


  subtitle: {
    fontSize: 10.5,
    color: Colors.textSecondary,
    marginTop: 3,
  },


  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },


  /* CURRENT ADDRESS */

  currentAddress: {
    flexDirection: 'row',
    backgroundColor: Colors.primarySoft,
    borderRadius: Radius.md,
    padding: 12,
    marginBottom: 18,
  },


  currentAddressIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },


  currentAddressContent: {
    flex: 1,
    marginLeft: 9,
  },


  currentAddressLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
  },


  currentAddressText: {
    fontSize: 11.5,
    lineHeight: 17,
    color: Colors.text,
    fontWeight: '600',
    marginTop: 2,
  },


  /* INPUT */

  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 7,
  },


  inputContainer: {
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: 13,
    paddingTop: 13,
  },


  input: {
    flex: 1,
    minHeight: 65,
    padding: 0,
    paddingLeft: 9,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.text,
  },


  /* HELPER */

  helper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    marginBottom: 17,
  },


  helperText: {
    fontSize: 10,
    color: Colors.textLight,
    marginLeft: 5,
  },


  /* SAVE */

  saveButton: {
    height: 54,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },


  saveButtonDisabled: {
    opacity: 0.45,
  },


  saveButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.white,
    marginRight: 8,
  },


  /* CANCEL */

  cancelButton: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },


  cancelText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },

});