import { clippingParents } from '@popperjs/core';
import { useEffect, useState } from 'react';
import { CharacterLocation } from '../models/location.model';

export function useFetchLocation(locationUrl?: string) {
  const [location, setLocation] = useState<CharacterLocation>({
    name: '',
    type: '',
  });

  const loadLocation = async () => {
    if (!locationUrl) return;
    const { name, type } = await fetch(locationUrl).then((res) => res.json());
    setLocation({ name, type });
  };

  useEffect(() => {
    loadLocation();
  }, []);

  return {
    location,
  };
}
