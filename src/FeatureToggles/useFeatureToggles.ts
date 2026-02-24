import { useContext } from 'react';

import { FeatureToggleContext } from './FeatureToggleProvider';

export const useFeatureToggles = () => useContext(FeatureToggleContext);
