/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="google.maps" />

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap
} from '@vis.gl/react-google-maps';
import { Landmark, Language, PetraServicePoint } from '../types';
import { LANDMARKS } from '../data/landmarks';
import { PETRA_SERVICES } from '../data/petraServices';
import {
  UI_TRANSLATIONS,
  MONUMENT_LOCALIZATIONS,
  SERVICE_LOCALIZATIONS,
  formatLocalizedWalkingDistance
} from '../data/translations';
import {
  Navigation,
  Eye,
  Check,
  Maximize2,
  Search,
  MapPin,
  X,
  Coffee,
  HeartPulse,
  Ticket,
  Droplet,
  Building2,
  Info,
  Footprints
} from 'lucide-react';

interface GooglePetraMapProps {
  language: Language;
  visitedLandmarks: string[];
  onSelectLandmark: (landmark: Landmark) => void;
  onToggleVisited: (landmarkId: string) => void;
  onAskAboutLandmark?: (query: string) => void;
}

type SelectedEntity =
  | { type: 'landmark'; data: Landmark }
  | { type: 'service'; data: PetraServicePoint }
  | null;

// Haversine direct distance calculation
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3;
  const p1 = (lat1 * Math.PI) / 180;
  const p2 = (lat2 * Math.PI) / 180;
  const deltaP = ((lat2 - lat1) * Math.PI) / 180;
  const deltaL = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaP / 2) * Math.sin(deltaP / 2) +
    Math.cos(p1) * Math.cos(p2) * Math.sin(deltaL / 2) * Math.sin(deltaL / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

// Controller for camera panning & resetting
const MapCameraDirector: React.FC<{
  targetCoords: { lat: number; lng: number } | null;
  targetZoom?: number;
  resetTrigger: number;
}> = ({ targetCoords, targetZoom, resetTrigger }) => {
  const map = useMap();

  // Smooth pan to selected location
  useEffect(() => {
    if (!map || !targetCoords) return;
    map.panTo(targetCoords);
    if (targetZoom) {
      map.setZoom(targetZoom);
    }
  }, [map, targetCoords, targetZoom]);

  // Reset to full valley view
  useEffect(() => {
    if (!map || resetTrigger === 0 || typeof google === 'undefined') return;

    const bounds = new google.maps.LatLngBounds();
    LANDMARKS.forEach(l => {
      bounds.extend(new google.maps.LatLng(l.geoCoordinates.lat, l.geoCoordinates.lng));
    });

    map.fitBounds(bounds, {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    });
  }, [map, resetTrigger]);

  return null;
};

export const GooglePetraMap: React.FC<GooglePetraMapProps> = ({
  language,
  visitedLandmarks,
  onSelectLandmark,
  onToggleVisited
}) => {
  const isAr = language === 'ar';
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const apiKey =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
    'AIzaSyBzRVEPUVM2_d893hArpU96nYnv9jcBgds';

  // Default valley center (Petra main valley)
  const defaultCenter = useMemo(() => ({ lat: 30.3285, lng: 35.4465 }), []);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('terrain');

  // SELECTED ENTITY ONLY: Map is completely clean and empty unless user clicks a card!
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity>(null);
  const [showInfoWindow, setShowInfoWindow] = useState<boolean>(true);

  // Active Bottom Tab
  const [activeTab, setActiveTab] = useState<'landmarks' | 'services'>('landmarks');
  const [listFilter, setListFilter] = useState<'all' | 'visited' | 'unvisited'>('all');
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Camera & view reset trigger
  const [panTarget, setPanTarget] = useState<{ lat: number; lng: number } | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(16);
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  // User Geolocation (real GPS or Petra Visitor Center fallback)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 30.3262,
    lng: 35.4578
  });
  const [locationSource, setLocationSource] = useState<'petra_entrance' | 'live_gps'>('petra_entrance');

  // Attempt live GPS upon mounting
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;
          const distToPetra = calculateDistanceMeters(userLat, userLng, 30.3285, 35.4465);

          // If within 150 km of Petra, activate live GPS mode
          if (distToPetra < 150000) {
            setUserLocation({ lat: userLat, lng: userLng });
            setLocationSource('live_gps');
          }
        },
        err => {
          console.warn('Geolocation initial check:', err.message);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    }
  }, []);

  // Request browser GPS manually
  const handleRequestLiveGPS = useCallback(() => {
    if (!navigator.geolocation) {
      alert(isAr ? 'متصفحك لا يدعم تحديد الموقع.' : 'Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        setUserLocation(coords);
        setLocationSource('live_gps');
        setPanTarget(coords);
        setZoomLevel(16);
      },
      err => {
        alert(
          isAr
            ? `تعذر الحصول على إحداثيات GPS: ${err.message}. تم الاستمرار بمركز زوار البتراء.`
            : `Could not retrieve GPS: ${err.message}. Continuing with Petra Visitor Center.`
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  }, [isAr]);

  // Set reference location back to Petra Siq Entrance
  const handleResetToPetraEntrance = () => {
    const entranceCoords = { lat: 30.3262, lng: 35.4578 };
    setUserLocation(entranceCoords);
    setLocationSource('petra_entrance');
    setPanTarget(entranceCoords);
    setZoomLevel(16);
  };

  // Helper to get localized name & desc for a landmark
  const getLandmarkText = useCallback((landmark: Landmark) => {
    const loc = MONUMENT_LOCALIZATIONS[landmark.id]?.[language];
    if (loc) {
      return { name: loc.name, desc: loc.desc };
    }
    return {
      name: isAr ? landmark.nameAr : landmark.nameEn,
      desc: isAr ? landmark.shortDescAr : landmark.shortDescEn
    };
  }, [language, isAr]);

  // Helper to get localized name & desc for a service
  const getServiceText = useCallback((service: PetraServicePoint) => {
    const loc = SERVICE_LOCALIZATIONS[service.id]?.[language];
    if (loc) {
      return { name: loc.name, desc: loc.desc };
    }
    return {
      name: isAr ? service.nameAr : service.nameEn,
      desc: isAr ? service.descriptionAr : service.descriptionEn
    };
  }, [language, isAr]);

  // Selecting a Landmark from Cards
  const handleSelectLandmarkCard = (landmark: Landmark) => {
    if (selectedEntity?.type === 'landmark' && selectedEntity.data.id === landmark.id) {
      // Toggle off if already selected
      setSelectedEntity(null);
    } else {
      setSelectedEntity({ type: 'landmark', data: landmark });
      setShowInfoWindow(true);
      setPanTarget(landmark.geoCoordinates);
      setZoomLevel(16);
    }
  };

  // Selecting a Service from Cards
  const handleSelectServiceCard = (service: PetraServicePoint) => {
    if (selectedEntity?.type === 'service' && selectedEntity.data.id === service.id) {
      // Toggle off if already selected
      setSelectedEntity(null);
    } else {
      setSelectedEntity({ type: 'service', data: service });
      setShowInfoWindow(true);
      setPanTarget(service.geoCoordinates);
      setZoomLevel(16);
    }
  };

  // Clear Selection & Reset Base Map
  const handleClearSelection = () => {
    setSelectedEntity(null);
    setShowInfoWindow(false);
  };

  // Filtered Landmarks
  const filteredLandmarks = useMemo(() => {
    return LANDMARKS.filter(lm => {
      const isVisited = visitedLandmarks.includes(lm.id);
      if (listFilter === 'visited' && !isVisited) return false;
      if (listFilter === 'unvisited' && isVisited) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const info = getLandmarkText(lm);
        const matchLoc = info.name.toLowerCase().includes(q) || info.desc.toLowerCase().includes(q);
        const matchAr = lm.nameAr.toLowerCase().includes(q) || lm.shortDescAr.toLowerCase().includes(q);
        const matchEn = lm.nameEn.toLowerCase().includes(q) || lm.shortDescEn.toLowerCase().includes(q);
        return matchLoc || matchAr || matchEn;
      }
      return true;
    });
  }, [visitedLandmarks, listFilter, searchQuery, getLandmarkText]);

  // Filtered Services
  const filteredServices = useMemo(() => {
    return PETRA_SERVICES.filter(svc => {
      if (serviceCategoryFilter !== 'all' && svc.category !== serviceCategoryFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const info = getServiceText(svc);
        const matchLoc = info.name.toLowerCase().includes(q) || info.desc.toLowerCase().includes(q);
        const matchAr = svc.nameAr.toLowerCase().includes(q) || svc.descriptionAr.toLowerCase().includes(q);
        const matchEn = svc.nameEn.toLowerCase().includes(q) || svc.descriptionEn.toLowerCase().includes(q);
        return matchLoc || matchAr || matchEn;
      }
      return true;
    });
  }, [serviceCategoryFilter, searchQuery, getServiceText]);

  // Helper for services icons
  const renderServiceIcon = (iconType: string, className = 'w-4 h-4') => {
    switch (iconType) {
      case 'restroom':
        return <span className="font-bold text-xs select-none">🚻</span>;
      case 'info':
        return <Info className={className} />;
      case 'medical':
        return <HeartPulse className={className} />;
      case 'restaurant':
        return <Coffee className={className} />;
      case 'ticket':
        return <Ticket className={className} />;
      case 'water':
        return <Droplet className={className} />;
      default:
        return <Building2 className={className} />;
    }
  };

  // Walking distance helper from user location to a given point
  const getWalkingBadge = useCallback((targetCoords: { lat: number; lng: number }) => {
    if (!userLocation) return null;
    const directM = calculateDistanceMeters(userLocation.lat, userLocation.lng, targetCoords.lat, targetCoords.lng);
    const trailM = Math.round(directM * 1.3); // Canyon mountainous walking factor
    return formatLocalizedWalkingDistance(trailM, language);
  }, [userLocation, language]);

  // Currently selected entity localized strings & distance
  const selectedDetails = useMemo(() => {
    if (!selectedEntity) return null;
    if (selectedEntity.type === 'landmark') {
      const text = getLandmarkText(selectedEntity.data);
      const dist = getWalkingBadge(selectedEntity.data.geoCoordinates);
      return { name: text.name, desc: text.desc, distanceBadge: dist };
    } else {
      const text = getServiceText(selectedEntity.data);
      const dist = getWalkingBadge(selectedEntity.data.geoCoordinates);
      return { name: text.name, desc: text.desc, distanceBadge: dist };
    }
  }, [selectedEntity, getLandmarkText, getServiceText, getWalkingBadge]);

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Map Header Controls Bar (Clean Base Map Toolbar) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white p-2.5 rounded-xl border border-[#C8963E]/30 shadow-xs text-xs">
        {/* Active Selection Indicator or Clean Map Notice */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedEntity && selectedDetails ? (
            <div className="flex items-center gap-2 bg-[#FAF5ED] px-3 py-1.5 rounded-lg border border-[#C8963E]/40">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-bold text-[#7A2E1D] max-w-[200px] truncate">
                {selectedDetails.name}
              </span>

              {selectedDetails.distanceBadge && (
                <span className="bg-[#7A2E1D] text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Footprints className="w-3 h-3 text-amber-200" />
                  <span>{selectedDetails.distanceBadge}</span>
                </span>
              )}

              <button
                type="button"
                onClick={handleClearSelection}
                className="text-stone-400 hover:text-stone-700 ml-1 p-0.5 rounded cursor-pointer"
                title={t.deselect}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-stone-500 font-medium px-2 py-1">
              <MapPin className="w-4 h-4 text-[#C8963E]" />
              <span>{t.cleanMapNotice}</span>
            </div>
          )}

          {/* Reset / Fit View Button */}
          <button
            type="button"
            onClick={() => setResetTrigger(prev => prev + 1)}
            className="px-2.5 py-1.5 rounded-lg bg-[#FAF5ED] text-[#7A2E1D] border border-[#C8963E]/40 hover:bg-[#E8DCC9] font-semibold transition cursor-pointer flex items-center gap-1 shadow-2xs"
            title={t.fitValley}
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#C8963E]" />
            <span>{t.fitValley}</span>
          </button>
        </div>

        {/* User Location State & Map Type switcher */}
        <div className="flex items-center gap-1.5 self-end sm:self-center flex-wrap">
          {/* Location Mode Switcher */}
          <div className="inline-flex rounded-lg bg-[#FAF5ED] p-0.5 border border-[#C8963E]/30 text-[11px]">
            <button
              type="button"
              onClick={handleResetToPetraEntrance}
              className={`px-2 py-1 rounded font-semibold cursor-pointer transition ${
                locationSource === 'petra_entrance'
                  ? 'bg-[#7A2E1D] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title={t.startSiqGate}
            >
              {t.startSiqGate}
            </button>

            <button
              type="button"
              onClick={handleRequestLiveGPS}
              className={`px-2 py-1 rounded font-semibold cursor-pointer transition ${
                locationSource === 'live_gps'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title={t.liveGps}
            >
              {t.liveGps}
            </button>
          </div>

          {/* Map Layer switcher */}
          <div className="inline-flex rounded-lg bg-stone-100 p-0.5 border border-stone-200">
            <button
              type="button"
              onClick={() => setMapType('terrain')}
              className={`px-2 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                mapType === 'terrain' ? 'bg-[#7A2E1D] text-white shadow-2xs' : 'text-stone-600'
              }`}
            >
              {t.terrain}
            </button>
            <button
              type="button"
              onClick={() => setMapType('satellite')}
              className={`px-2 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                mapType === 'satellite' ? 'bg-[#7A2E1D] text-white shadow-2xs' : 'text-stone-600'
              }`}
            >
              {t.satellite}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Pristine Google Map Viewport with dynamic language localization */}
      <div className="relative w-full h-[520px] rounded-xl overflow-hidden border-2 border-[#C8963E]/40 shadow-sm bg-[#FAF5ED]">
        <APIProvider apiKey={apiKey} language={language} region="JO">
          <Map
            defaultCenter={defaultCenter}
            defaultZoom={14}
            mapId="DEMO_MAP_ID"
            mapTypeId={mapType}
            gestureHandling="greedy"
            disableDefaultUI={false}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
          >
            {/* Camera pan and zoom director */}
            <MapCameraDirector
              targetCoords={panTarget}
              targetZoom={zoomLevel}
              resetTrigger={resetTrigger}
            />

            {/* User Reference Location Marker (Blue pulse dot) */}
            {userLocation && (
              <AdvancedMarker position={userLocation} title={t.liveGps}>
                <div className="relative flex items-center justify-center cursor-pointer">
                  <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-blue-400 opacity-75" />
                  <div className="relative w-4.5 h-4.5 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center text-[8px] text-white font-bold">
                    📍
                  </div>
                </div>
              </AdvancedMarker>
            )}

            {/* ONLY DISPLAY THE CHOSEN MARKER WHEN AN ITEM IS SELECTED */}
            {selectedEntity && selectedDetails && (
              <AdvancedMarker
                position={selectedEntity.data.geoCoordinates}
                title={selectedDetails.name}
                onClick={() => setShowInfoWindow(!showInfoWindow)}
              >
                <div className="cursor-pointer flex flex-col items-center animate-bounce duration-300">
                  {selectedEntity.type === 'landmark' ? (
                    // Landmark Pin
                    <div
                      className={`w-9 h-9 rounded-full shadow-xl border-2 border-white flex items-center justify-center font-bold text-xs ${
                        visitedLandmarks.includes(selectedEntity.data.id)
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-300'
                          : 'bg-[#7A2E1D] text-[#FAF5ED] ring-4 ring-[#C8963E]'
                      }`}
                    >
                      {visitedLandmarks.includes(selectedEntity.data.id)
                        ? '✓'
                        : `#${selectedEntity.data.routeOrder}`}
                    </div>
                  ) : (
                    // Service Pin
                    <div
                      className={`w-9 h-9 rounded-full shadow-xl border-2 border-white flex items-center justify-center font-bold text-sm ${
                        selectedEntity.data.category === 'restroom'
                          ? 'bg-blue-600 text-white ring-4 ring-blue-300'
                          : selectedEntity.data.category === 'medical'
                          ? 'bg-red-600 text-white ring-4 ring-red-300'
                          : 'bg-amber-700 text-white ring-4 ring-amber-300'
                      }`}
                    >
                      {renderServiceIcon(selectedEntity.data.iconType, 'w-4 h-4')}
                    </div>
                  )}

                  {/* Pin Callout Badge */}
                  <div className="mt-1 px-2 py-0.5 bg-[#331C16] text-[#F6EEE1] text-[11px] font-bold rounded-md shadow border border-[#C8963E]/40 whitespace-nowrap max-w-[200px] truncate">
                    {selectedDetails.name}
                  </div>
                </div>
              </AdvancedMarker>
            )}

            {/* InfoWindow for the selected location with Distance and Duration */}
            {selectedEntity && selectedDetails && showInfoWindow && (
              <InfoWindow
                position={selectedEntity.data.geoCoordinates}
                onCloseClick={() => setShowInfoWindow(false)}
                pixelOffset={[0, -32]}
              >
                <div className="w-68 max-w-[290px] p-1 font-sans text-left rtl:text-right">
                  {selectedEntity.type === 'landmark' ? (
                    <div>
                      {selectedEntity.data.thumbnailUrl && (
                        <div className="relative h-28 w-full rounded-lg overflow-hidden mb-2 bg-[#7A2E1D]">
                          <img
                            src={selectedEntity.data.thumbnailUrl}
                            alt={selectedDetails.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-1 left-1 bg-[#7A2E1D]/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            #{selectedEntity.data.routeOrder}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4 className="font-bold text-xs text-[#7A2E1D] leading-tight">
                          {selectedDetails.name}
                        </h4>
                        {visitedLandmarks.includes(selectedEntity.data.id) && (
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-300">
                            {t.visitedStatus}
                          </span>
                        )}
                      </div>

                      {/* Prominent Live Distance & Duration in InfoWindow */}
                      {selectedDetails.distanceBadge && (
                        <div className="my-1.5 px-2 py-1 rounded bg-[#FAF5ED] border border-[#C8963E]/40 text-[#7A2E1D] text-[11px] font-bold flex items-center gap-1.5">
                          <Footprints className="w-3.5 h-3.5 text-[#C8963E] shrink-0" />
                          <span>{selectedDetails.distanceBadge}</span>
                        </div>
                      )}

                      <p className="text-[10px] text-stone-600 line-clamp-2 mb-2 leading-relaxed">
                        {selectedDetails.desc}
                      </p>

                      <div className="flex items-center gap-1.5 pt-1.5 border-t border-stone-200">
                        <button
                          type="button"
                          onClick={() => onSelectLandmark(selectedEntity.data)}
                          className="flex-1 bg-[#7A2E1D] hover:bg-[#612215] text-[#F6EEE1] text-xs font-bold py-1 px-2 rounded-md text-center transition cursor-pointer"
                        >
                          {t.readStory} 📖
                        </button>

                        <button
                          type="button"
                          onClick={() => onToggleVisited(selectedEntity.data.id)}
                          className={`text-xs py-1 px-2.5 rounded-md font-bold transition cursor-pointer border ${
                            visitedLandmarks.includes(selectedEntity.data.id)
                              ? 'bg-emerald-600 text-white border-emerald-700'
                              : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                          }`}
                        >
                          {visitedLandmarks.includes(selectedEntity.data.id) ? t.visitedStatus : t.markVisited}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            selectedEntity.data.category === 'restroom'
                              ? 'bg-blue-600 text-white'
                              : 'bg-amber-700 text-white'
                          }`}
                        >
                          {renderServiceIcon(selectedEntity.data.iconType, 'w-3.5 h-3.5')}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#331C16] leading-tight">
                            {selectedDetails.name}
                          </h4>
                          <span className="text-[10px] text-stone-500 font-medium">
                            {t.fieldFacility}
                          </span>
                        </div>
                      </div>

                      {/* Prominent Live Distance & Duration in InfoWindow for Services */}
                      {selectedDetails.distanceBadge && (
                        <div className="my-1.5 px-2 py-1 rounded bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-bold flex items-center gap-1.5">
                          <Footprints className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{selectedDetails.distanceBadge}</span>
                        </div>
                      )}

                      <p className="text-[11px] text-stone-700 leading-snug mb-1">
                        {selectedDetails.desc}
                      </p>
                    </div>
                  )}
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>

      {/* 3. Bottom Cards Section with Real Photos, Localized Distance Badge & Selection */}
      <div className="bg-white rounded-xl border border-[#C8963E]/30 p-4 shadow-xs">
        {/* Navigation Tabs (Archaeological Sites vs. Services) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#E8DCC9]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('landmarks')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'landmarks'
                  ? 'bg-[#7A2E1D] text-white shadow-xs'
                  : 'bg-[#FAF5ED] text-[#561E12] border border-[#C8963E]/30 hover:bg-[#E8DCC9]'
              }`}
            >
              <span>🏛️</span>
              <span>{t.tabMonuments}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'services'
                  ? 'bg-[#1F6E68] text-white shadow-xs'
                  : 'bg-[#FAF5ED] text-[#561E12] border border-[#C8963E]/30 hover:bg-[#E8DCC9]'
              }`}
            >
              <span>🚻</span>
              <span>{t.tabServices}</span>
            </button>
          </div>

          {/* Search & Sub-filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="pl-7 pr-2.5 py-1 text-xs rounded-lg border border-stone-300 focus:outline-none focus:border-[#C8963E] w-32 sm:w-44"
              />
              <Search className="w-3 h-3 text-stone-400 absolute left-2 top-2 rtl:left-auto rtl:right-2" />
            </div>

            {activeTab === 'landmarks' ? (
              <div className="inline-flex rounded-lg bg-[#FAF5ED] p-0.5 border border-[#E8DCC9] text-[11px]">
                <button
                  type="button"
                  onClick={() => setListFilter('all')}
                  className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                    listFilter === 'all' ? 'bg-[#7A2E1D] text-white' : 'text-stone-700'
                  }`}
                >
                  {t.filterAll}
                </button>
                <button
                  type="button"
                  onClick={() => setListFilter('visited')}
                  className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                    listFilter === 'visited' ? 'bg-emerald-700 text-white' : 'text-stone-700'
                  }`}
                >
                  {t.filterVisited} ({visitedLandmarks.length})
                </button>
                <button
                  type="button"
                  onClick={() => setListFilter('unvisited')}
                  className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                    listFilter === 'unvisited' ? 'bg-[#C8963E] text-stone-900' : 'text-stone-700'
                  }`}
                >
                  {t.filterRemaining} ({LANDMARKS.length - visitedLandmarks.length})
                </button>
              </div>
            ) : (
              <div className="inline-flex rounded-lg bg-[#FAF5ED] p-0.5 border border-[#E8DCC9] text-[11px]">
                <button
                  type="button"
                  onClick={() => setServiceCategoryFilter('all')}
                  className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                    serviceCategoryFilter === 'all' ? 'bg-[#1F6E68] text-white' : 'text-stone-700'
                  }`}
                >
                  {t.filterAll}
                </button>
                <button
                  type="button"
                  onClick={() => setServiceCategoryFilter('restroom')}
                  className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                    serviceCategoryFilter === 'restroom' ? 'bg-blue-600 text-white' : 'text-stone-700'
                  }`}
                >
                  {t.svcRestrooms}
                </button>
                <button
                  type="button"
                  onClick={() => setServiceCategoryFilter('medical')}
                  className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                    serviceCategoryFilter === 'medical' ? 'bg-red-600 text-white' : 'text-stone-700'
                  }`}
                >
                  {t.svcMedical}
                </button>
                <button
                  type="button"
                  onClick={() => setServiceCategoryFilter('restaurant')}
                  className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                    serviceCategoryFilter === 'restaurant' ? 'bg-amber-700 text-white' : 'text-stone-700'
                  }`}
                >
                  {t.svcCafes}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CARDS GRID: Archaeological Sites (Tab 1) */}
        {activeTab === 'landmarks' && (
          <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredLandmarks.map(landmark => {
              const isVisited = visitedLandmarks.includes(landmark.id);
              const isSelected =
                selectedEntity?.type === 'landmark' && selectedEntity.data.id === landmark.id;
              const text = getLandmarkText(landmark);
              const distanceBadge = getWalkingBadge(landmark.geoCoordinates);

              return (
                <div
                  key={landmark.id}
                  className={`rounded-xl border p-3 flex flex-col justify-between transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#FAF5ED] border-[#7A2E1D] ring-3 ring-[#C8963E] shadow-md -translate-y-0.5'
                      : isVisited
                      ? 'bg-emerald-50/60 border-emerald-300 hover:shadow-xs'
                      : 'bg-white border-stone-200 hover:border-[#C8963E] hover:shadow-xs'
                  }`}
                >
                  <div>
                    {/* Header info */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                            isVisited ? 'bg-emerald-600 text-white' : 'bg-[#7A2E1D] text-white'
                          }`}
                        >
                          {isVisited ? '✓' : landmark.routeOrder}
                        </span>
                        <span className="text-[10px] text-stone-500 font-medium">
                          {isVisited ? t.visitedBadge : `#${landmark.routeOrder}`}
                        </span>
                      </div>

                      {isSelected && (
                        <span className="bg-[#7A2E1D] text-[#FAF5ED] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>{t.onMap}</span>
                        </span>
                      )}
                    </div>

                    {/* Authentic Petra Image */}
                    <div
                      onClick={() => handleSelectLandmarkCard(landmark)}
                      className="cursor-pointer group"
                    >
                      <div className="relative h-28 w-full rounded-lg overflow-hidden mb-2 bg-[#7A2E1D]/20">
                        <img
                          src={landmark.thumbnailUrl}
                          alt={text.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                          <span className="text-white text-[10px] font-bold flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#C8963E]" />
                            {t.selectPrompt}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-bold text-xs text-[#331C16] leading-snug group-hover:text-[#7A2E1D]">
                        {text.name}
                      </h4>

                      {/* Clear Distance and Duration badge on the card */}
                      {distanceBadge && (
                        <div className="my-1.5 px-2 py-0.5 rounded bg-[#FAF5ED] border border-[#C8963E]/30 text-[#7A2E1D] text-[10px] font-bold flex items-center gap-1">
                          <Footprints className="w-3 h-3 text-[#C8963E] shrink-0" />
                          <span className="truncate">{distanceBadge}</span>
                        </div>
                      )}

                      <p className="text-[10px] text-stone-500 line-clamp-2 mt-1 leading-snug">
                        {text.desc}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Selection Buttons */}
                  <div className="mt-3 pt-2.5 border-t border-stone-200/80 flex items-center justify-between gap-1.5">
                    {/* Primary Selection Toggle Button */}
                    <button
                      type="button"
                      onClick={() => handleSelectLandmarkCard(landmark)}
                      className={`text-xs px-2.5 py-1 rounded-md font-bold transition cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? 'bg-[#7A2E1D] text-white shadow-xs'
                          : 'bg-[#FAF5ED] text-[#7A2E1D] border border-[#C8963E]/40 hover:bg-[#E8DCC9]'
                      }`}
                    >
                      <MapPin className="w-3 h-3 text-[#C8963E]" />
                      <span>{isSelected ? t.deselect : t.pinOnMap}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onSelectLandmark(landmark)}
                        className="p-1 rounded text-stone-500 hover:text-[#7A2E1D] transition cursor-pointer"
                        title={t.readStory}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Visited Toggle Button */}
                      <button
                        type="button"
                        onClick={() => onToggleVisited(landmark.id)}
                        className={`text-[11px] px-2 py-1 rounded-md font-bold transition cursor-pointer border flex items-center gap-1 ${
                          isVisited
                            ? 'bg-emerald-600 text-white border-emerald-700'
                            : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300'
                        }`}
                        title={t.markVisited}
                      >
                        <Check className="w-3 h-3" />
                        <span>{isVisited ? t.visitedStatus : t.markVisited}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CARDS GRID: Services & Restrooms (Tab 2) */}
        {activeTab === 'services' && (
          <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredServices.map(service => {
              const isSelected =
                selectedEntity?.type === 'service' && selectedEntity.data.id === service.id;
              const isRestroom = service.category === 'restroom';
              const text = getServiceText(service);
              const distanceBadge = getWalkingBadge(service.geoCoordinates);

              return (
                <div
                  key={service.id}
                  className={`rounded-xl border p-3 flex flex-col justify-between transition-all duration-200 ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 ring-3 ring-blue-300 shadow-md'
                      : 'bg-white border-stone-200 hover:border-stone-400 hover:shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white ${
                          isRestroom
                            ? 'bg-blue-600'
                            : service.category === 'medical'
                            ? 'bg-red-600'
                            : 'bg-amber-700'
                        }`}
                      >
                        {renderServiceIcon(service.iconType, 'w-3.5 h-3.5')}
                      </div>

                      {isSelected && (
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>{t.onMap}</span>
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-xs text-[#331C16] leading-snug mb-1">
                      {text.name}
                    </h4>

                    {/* Clear Distance and Duration badge on service card */}
                    {distanceBadge && (
                      <div className="my-1.5 px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-900 text-[10px] font-bold flex items-center gap-1">
                        <Footprints className="w-3 h-3 text-blue-600 shrink-0" />
                        <span className="truncate">{distanceBadge}</span>
                      </div>
                    )}

                    <p className="text-[10px] text-stone-500 leading-snug">
                      {text.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-200/80 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleSelectServiceCard(service)}
                      className={`w-full text-xs py-1.5 rounded-md font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{isSelected ? t.deselect : t.pinOnMap}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
