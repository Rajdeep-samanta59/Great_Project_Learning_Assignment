import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Milestone } from '../types';

interface Props {
  milestone: Milestone;
  onToggleComplete: () => void;
  onRemove: () => void;
}

export const MilestoneItem: React.FC<Props> = ({ 
  milestone, 
  onToggleComplete, 
  onRemove 
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={onToggleComplete}>
        <View style={styles.info}>
          <Text style={[styles.name, milestone.completed && styles.completed]}>
            {milestone.order}. {milestone.name}
          </Text>
          <Text style={styles.duration}>{milestone.estimatedDuration} min</Text>
        </View>
        <View style={styles.status}>
          <Text style={styles.statusText}>
            {milestone.completed ? '✓' : '○'}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
        <Text style={styles.removeText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 4,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  duration: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  status: {
    marginLeft: 12,
  },
  statusText: {
    fontSize: 20,
    color: '#007AFF',
  },
  removeBtn: {
    padding: 12,
    backgroundColor: '#FF3B30',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  removeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});