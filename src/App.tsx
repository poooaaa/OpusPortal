/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Upload,
  Globe,
  Trash2,
  CheckCircle,
  Edit3
} from 'lucide-react';

export interface PluginItem {
  id: string;
  name: string;
  description: string;
  appUrl: string;
  iconType: 'svg' | 'image';
  iconSvg?: string;
  imageUrl?: string;
  isFullImage?: boolean;
}

// Default plugins collection
const DEFAULT_PLUGINS: PluginItem[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Read and manage Gmail',
    appUrl: 'https://mail.google.com',
    iconType: 'svg',
    iconSvg: 'gmail',
    isFullImage: false
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Drive, Docs, Sheets or Slides',
    appUrl: 'https://drive.google.com',
    iconType: 'svg',
    iconSvg: 'drive',
    isFullImage: false
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Explore your health data in Health app',
    appUrl: 'https://apple.com/ios/health/',
    iconType: 'svg',
    iconSvg: 'health',
    isFullImage: false
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Triage PRs, issues, CI, and notifications',
    appUrl: 'https://github.com',
    iconType: 'svg',
    iconSvg: 'github',
    isFullImage: false
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Manage and query databases',
    appUrl: 'https://supabase.com',
    iconType: 'svg',
    iconSvg: 'supabase',
    isFullImage: false
  },
  {
    id: 'outlook',
    name: 'Outlook Email',
    description: 'Triage Outlook inboxes',
    appUrl: 'https://outlook.live.com',
    iconType: 'svg',
    iconSvg: 'outlook',
    isFullImage: false
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Triage issues, cycles and roadmaps',
    appUrl: 'https://linear.app',
    iconType: 'svg',
    iconSvg: 'linear',
    isFullImage: false
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Access pages, databases & workspaces',
    appUrl: 'https://notion.so',
    iconType: 'svg',
    iconSvg: 'notion',
    isFullImage: false
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send messages & query workspace threads',
    appUrl: 'https://slack.com',
    iconType: 'svg',
    iconSvg: 'slack',
    isFullImage: false
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Search tracks, albums & create playlists',
    appUrl: 'https://open.spotify.com',
    iconType: 'svg',
    iconSvg: 'spotify',
    isFullImage: false
  },
  {
    id: 'wolfram',
    name: 'Wolfram',
    description: 'Access computational intelligence & math',
    appUrl: 'https://www.wolframalpha.com',
    iconType: 'svg',
    iconSvg: 'wolfram',
    isFullImage: false
  }
];

// Helper to render icon for both small list and large "Aplikasi Terbaru" cards
function renderPluginIcon(plugin: PluginItem, isLarge: boolean = false) {
  const iconSizeClass = isLarge ? "w-[47px] h-[47px] sm:w-[52px] sm:h-[52px]" : "w-6 h-6";

  if (plugin.iconType === 'image' && plugin.imageUrl) {
    return (
      <img
        src={plugin.imageUrl}
        alt={plugin.name}
        loading="eager"
        decoding="sync"
        style={{
          imageRendering: 'auto',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
        className={
          plugin.isFullImage
            ? "w-full h-full object-cover"
            : (isLarge ? "w-full h-full object-contain p-2.5" : "w-full h-full object-contain p-1")
        }
      />
    );
  }

  switch (plugin.iconSvg) {
    case 'gmail':
      return (
        <svg viewBox="0 0 48 48" className={iconSizeClass}>
          <path fill="#4caf50" d="M45 16.2l-5 2.75v18.05c0 2.2-1.8 4-4 4h-4V23.67L45 16.2z" />
          <path fill="#1e88e5" d="M3 16.2l5 2.75v18.05c0 2.2 1.8 4 4 4h4V23.67L3 16.2z" />
          <path fill="#e53935" d="M35 11l-11 8.25L13 11c-2.35-1.76-5.63-.64-6.49 2.19L3 16.2l13 9.75 8 6 8-6 13-9.75-3.51-3.01C40.63 10.36 37.35 9.24 35 11z" />
          <path fill="#c62828" d="M3 16.2v3.8l13 9.75V23.67L3 16.2z" />
          <path fill="#fbc02d" d="M45 16.2v3.8l-13 9.75V23.67L45 16.2z" />
        </svg>
      );
    case 'drive':
      return (
        <svg viewBox="0 0 87.3 78" className={iconSizeClass}>
          <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
          <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/>
          <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
          <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
          <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
          <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
        </svg>
      );
    case 'health':
      return (
        <div className={`${isLarge ? 'w-12 h-12 p-2.5' : 'w-6 h-6 p-1'} rounded-full bg-rose-600 flex items-center justify-center shrink-0`}>
          <svg viewBox="0 0 24 24" fill="white" className={isLarge ? "w-7 h-7" : "w-3.5 h-3.5"}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="white" className={iconSizeClass}>
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      );
    case 'supabase':
      return (
        <svg viewBox="0 0 24 24" className={iconSizeClass}>
          <path d="M13.35 2L3 14.45h7.24V22l10.35-12.45h-7.24V2z" fill="#3ecf8e" />
        </svg>
      );
    case 'outlook':
      return (
        <svg viewBox="0 0 48 48" className={iconSizeClass}>
          <path fill="#0078d4" d="M28 6h14a2 2 0 0 1 2 2v32a2 2 0 0 1-2 2H28V6z" />
          <path fill="#28a8ea" d="M28 17h16v14H28z" />
          <path fill="#005da6" d="M28 6l16 11v14L28 42V6z" opacity=".2" />
          <path fill="#024c87" d="M28 31l16-11v20a2 2 0 0 1-2 2H28V31z" opacity=".3" />
          <rect width="24" height="24" x="4" y="12" fill="#0078d4" rx="4" />
          <circle cx="16" cy="24" r="6" fill="#fff" />
        </svg>
      );
    case 'linear':
      return (
        <svg viewBox="0 0 24 24" className={iconSizeClass}>
          <path d="M3.22 19.28L19.28 3.22A11.5 11.5 0 0 0 3.22 19.28z" fill="#5E6AD2" />
          <path d="M4.72 20.78a11.5 11.5 0 0 0 16.06-16.06L4.72 20.78z" fill="#5E6AD2" opacity=".6" />
        </svg>
      );
    case 'notion':
      return (
        <svg viewBox="0 0 24 24" className={iconSizeClass}>
          <path fill="white" d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.482-.699c.373 0 .466-.187.327-.42l-1.587-2.1c-.28-.374-.793-.654-1.4-.607L2.965 1.782c-.466.047-.607.327-.42.607l1.914 1.819zm-.887 3.361v14.423c0 .56.327.793.84.793l13.676-.793c.56 0 .747-.42.747-.887V6.682c0-.513-.233-.747-.7-.747l-13.816.887c-.514.047-.747.28-.747.747zm11.996 1.493c.093.42.047.887-.374.933l-.84.14v7.748c0 .887-.42 1.353-1.447 1.447l-1.867.14c-.373 0-.513-.187-.606-.467l-2.8-4.434v4.48l1.073.233c.374.094.467.374.467.747l-2.614.187c-.093-.374-.047-.84.373-.887l.84-.14V11.23l-1.073-.14c-.373-.047-.467-.327-.42-.747l2.847-.187c.327 0 .56.14.7.42l3.08 4.714v-4.667l-1.027-.14c-.373-.047-.466-.327-.42-.747l2.894-.187z"/>
        </svg>
      );
    case 'slack':
      return (
        <svg viewBox="0 0 24 24" className={iconSizeClass}>
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#e01e5a"/>
          <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36c5f0"/>
          <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2eb67d"/>
          <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ecb22e"/>
        </svg>
      );
    case 'spotify':
      return (
        <svg viewBox="0 0 24 24" className={iconSizeClass}>
          <circle cx="12" cy="12" r="12" fill="#1ed760" />
          <path d="M17.9 16.55c-.2.3-.6.4-.9.2-2.6-1.6-5.8-1.9-9.6-1.1-.4.1-.7-.2-.8-.5-.1-.4.2-.7.5-.8 4.2-.9 7.7-.6 10.6 1.2.3.2.4.6.2 1zm1.2-2.7c-.3.4-.8.5-1.2.3-3-1.8-7.5-2.4-11-1.3-.5.1-.9-.1-1.1-.6-.1-.4.1-.9.6-1.1 4.1-1.2 9.1-.6 12.4 1.5.4.3.6.8.3 1.2zm.1-2.8C15.6 8.9 9.1 8.7 5.3 9.8c-.6.2-1.2-.2-1.3-.7-.2-.6.2-1.2.7-1.3 4.4-1.3 11.6-1.1 16 1.5.5.3.7 1 .4 1.5-.3.5-1 .7-1.5.4z" fill="#111113"/>
        </svg>
      );
    case 'wolfram':
      return (
        <svg viewBox="0 0 24 24" className={iconSizeClass}>
          <path fill="#DD1100" d="M12 2l2.3 5.3 5.7-.7-3.4 4.7 3.4 4.7-5.7-.7L12 20.7l-2.3-5.4-5.7.7 3.4-4.7-3.4-4.7 5.7.7L12 2z"/>
        </svg>
      );
    default:
      return <Globe className={`${iconSizeClass} text-neutral-400`} />;
  }
}

export default function App() {
  const [plugins, setPlugins] = useState<PluginItem[]>(() => {
    try {
      const saved = localStorage.getItem('user_plugins_list');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_PLUGINS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeIframePlugin, setActiveIframePlugin] = useState<PluginItem | null>(null);

  // States for #delete UI
  const [deleteInputName, setDeleteInputName] = useState('');
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  // States for #add UI
  const [addName, setAddName] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addImageUrl, setAddImageUrl] = useState('');
  const [addAppUrl, setAddAppUrl] = useState('');
  const [addIsFullImage, setAddIsFullImage] = useState(false);
  const [addMessage, setAddMessage] = useState<string | null>(null);

  // States for #edit UI
  const [editSearchName, setEditSearchName] = useState('');
  const [editingTargetPlugin, setEditingTargetPlugin] = useState<PluginItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editAppUrl, setEditAppUrl] = useState('');
  const [editIsFullImage, setEditIsFullImage] = useState(false);
  const [editMessage, setEditMessage] = useState<string | null>(null);

  const addFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Touch gesture state for bottom sheet dismiss
  const touchStartY = useRef<number | null>(null);
  const [sheetTranslateY, setSheetTranslateY] = useState(0);

  // Save plugins to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('user_plugins_list', JSON.stringify(plugins));
    } catch {
      // ignore
    }
  }, [plugins]);

  // Mode detection
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const isDeleteMode = normalizedQuery === '#delete';
  const isAddMode = normalizedQuery === '#add';
  const isEditMode = normalizedQuery === '#edit';

  // Handle Delete Plugin
  const handleDeleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deleteInputName.trim()) {
      setDeleteMessage('Silakan masukkan nama plugin yang ingin dihapus.');
      return;
    }

    const targetName = deleteInputName.trim().toLowerCase();
    const existingIndex = plugins.findIndex(
      (p) => p.name.toLowerCase() === targetName
    );

    if (existingIndex === -1) {
      setDeleteMessage(`Aplikasi dengan nama "${deleteInputName}" tidak ditemukan.`);
      return;
    }

    const updated = plugins.filter((_, idx) => idx !== existingIndex);
    setPlugins(updated);
    setDeleteMessage(`Aplikasi "${deleteInputName}" berhasil dihapus!`);
    setDeleteInputName('');
  };

  // Handle image upload from device for Add
  const handleAddFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAddImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload from device for Edit
  const handleEditFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Add Plugin Submit
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim()) {
      setAddMessage('Nama aplikasi wajib diisi.');
      return;
    }
    if (!addAppUrl.trim()) {
      setAddMessage('URL aplikasi website wajib diisi.');
      return;
    }

    let finalUrl = addAppUrl.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    const newPlugin: PluginItem = {
      id: 'plugin-' + Date.now(),
      name: addName.trim(),
      description: addDescription.trim() || 'Aplikasi website',
      appUrl: finalUrl,
      iconType: addImageUrl.trim() ? 'image' : 'svg',
      imageUrl: addImageUrl.trim() || undefined,
      iconSvg: addImageUrl.trim() ? undefined : 'default',
      isFullImage: addIsFullImage
    };

    setPlugins((prev) => [newPlugin, ...prev]);
    setAddMessage(`Aplikasi "${addName}" berhasil disimpan!`);
    setAddName('');
    setAddDescription('');
    setAddImageUrl('');
    setAddAppUrl('');
    setAddIsFullImage(false);
  };

  // Handle selecting an application to edit
  const handleStartEditing = (plugin: PluginItem) => {
    setEditingTargetPlugin(plugin);
    setEditName(plugin.name);
    setEditDescription(plugin.description);
    setEditImageUrl(plugin.imageUrl || '');
    setEditAppUrl(plugin.appUrl);
    setEditIsFullImage(!!plugin.isFullImage);
    setEditMessage(null);
  };

  // Handle Edit Submit (100% same structure as Add)
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTargetPlugin) return;

    if (!editName.trim()) {
      setEditMessage('Nama aplikasi wajib diisi.');
      return;
    }
    if (!editAppUrl.trim()) {
      setEditMessage('URL aplikasi website wajib diisi.');
      return;
    }

    let finalUrl = editAppUrl.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    const updatedPlugin: PluginItem = {
      ...editingTargetPlugin,
      name: editName.trim(),
      description: editDescription.trim() || 'Aplikasi website',
      appUrl: finalUrl,
      iconType: editImageUrl.trim() ? 'image' : (editingTargetPlugin.iconType || 'svg'),
      imageUrl: editImageUrl.trim() || undefined,
      iconSvg: editImageUrl.trim() ? undefined : (editingTargetPlugin.iconSvg || 'default'),
      isFullImage: editIsFullImage
    };

    setPlugins((prev) =>
      prev.map((p) => (p.id === editingTargetPlugin.id ? updatedPlugin : p))
    );

    setEditMessage(`Perubahan untuk "${editName}" berhasil disimpan!`);
    setEditingTargetPlugin(updatedPlugin);
  };

  // Filter plugins when normal searching
  const filteredPlugins = useMemo(() => {
    if (isDeleteMode || isAddMode || isEditMode) return [];
    if (!searchQuery.trim()) return plugins;
    const q = searchQuery.toLowerCase().trim();
    return plugins.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [plugins, searchQuery, isDeleteMode, isAddMode, isEditMode]);

  // Partition plugins: "Aplikasi Terbaru" strictly 5 apps only
  const recentPlugins = useMemo(() => {
    return plugins.slice(0, 5);
  }, [plugins]);

  const otherPlugins = useMemo(() => {
    return plugins.slice(5);
  }, [plugins]);

  // Touch handlers for bottom sheet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;
    if (diff > 0) {
      setSheetTranslateY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (sheetTranslateY > 90) {
      setActiveIframePlugin(null);
    }
    setSheetTranslateY(0);
    touchStartY.current = null;
  };

  return (
    <div className="min-h-screen bg-[#111113] text-[#ececec] flex flex-col items-center">
      <div className="w-full max-w-md md:max-w-xl px-4 sm:px-6 pt-5 pb-16 flex flex-col">
        
        {/* 1. KOLOM PENCARIAN DI PALING ATAS */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <Search className="w-4 h-4 text-neutral-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDeleteMessage(null);
              setAddMessage(null);
              setEditMessage(null);
              if (e.target.value.trim().toLowerCase() !== '#edit') {
                setEditingTargetPlugin(null);
              }
            }}
            placeholder="Cari Aplikasi..."
            style={{ outline: 'none', boxShadow: 'none' }}
            className="w-full bg-[#18181c] border border-[#27272c] focus:border-[#27272c] focus:outline-none focus:ring-0 rounded-full py-2.5 pl-10 pr-9 text-sm text-[#ececec] placeholder-neutral-400 transition-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setDeleteMessage(null);
                setAddMessage(null);
                setEditMessage(null);
                setEditingTargetPlugin(null);
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. UI MODE: #delete (HAPUS PLUGIN) */}
        {isDeleteMode && (
          <div className="bg-[#18181c] border border-[#27272c] rounded-2xl p-4 mb-4 flex flex-col gap-3 shadow-lg animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#25252a]">
              <span className="text-sm font-medium text-white flex items-center gap-1.5">
                <Trash2 className="w-4 h-4 text-rose-400" />
                Hapus Aplikasi
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-neutral-400 hover:text-white cursor-pointer"
              >
                Tutup
              </button>
            </div>

            {deleteMessage && (
              <div className="text-xs p-2.5 rounded-lg bg-neutral-900 border border-[#2e2e36] text-neutral-200">
                {deleteMessage}
              </div>
            )}

            <form onSubmit={handleDeleteSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-neutral-400 mb-1.5 block">
                  Nama Aplikasi yang Ingin Dihapus
                </label>
                <input
                  type="text"
                  value={deleteInputName}
                  onChange={(e) => setDeleteInputName(e.target.value)}
                  placeholder="Ketik nama aplikasi..."
                  style={{ outline: 'none', boxShadow: 'none' }}
                  className="w-full bg-[#111113] border border-[#2b2b32] focus:border-[#40404a] rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500"
                />
              </div>

              {/* Suggestions list for quick select */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-neutral-500 w-full">
                  Pilih cepat:
                </span>
                {plugins.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setDeleteInputName(p.name)}
                    className="text-xs bg-[#202024] hover:bg-[#28282e] text-neutral-300 px-2.5 py-1 rounded-lg border border-[#2a2a30] transition-colors cursor-pointer"
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 3. UI MODE: #add */}
        {isAddMode && (
          <div className="bg-[#18181c] border border-[#27272c] rounded-2xl p-4 mb-4 flex flex-col gap-3 shadow-lg animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#25252a]">
              <span className="text-sm font-medium text-white flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-400" />
                Tambah Aplikasi Website
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-neutral-400 hover:text-white cursor-pointer"
              >
                Tutup
              </button>
            </div>

            {addMessage && (
              <div className="text-xs p-2.5 rounded-lg bg-neutral-900 border border-[#2e2e36] text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                {addMessage}
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-neutral-400 mb-1 block">
                  Nama Aplikasi *
                </label>
                <input
                  type="text"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="Contoh: Portfolio Saya, Toko Online..."
                  style={{ outline: 'none', boxShadow: 'none' }}
                  className="w-full bg-[#111113] border border-[#2b2b32] focus:border-[#40404a] rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 mb-1 block">
                  Deskripsi Aplikasi (Maksimal 1 baris)
                </label>
                <input
                  type="text"
                  value={addDescription}
                  onChange={(e) => setAddDescription(e.target.value)}
                  placeholder="Keterangan singkat tentang aplikasi..."
                  style={{ outline: 'none', boxShadow: 'none' }}
                  className="w-full bg-[#111113] border border-[#2b2b32] focus:border-[#40404a] rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 mb-1 block">
                  Icon / Gambar Aplikasi (URL atau Dari Penyimpanan HP)
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={addImageUrl}
                    onChange={(e) => setAddImageUrl(e.target.value)}
                    placeholder="Masukkan URL gambar icon (opsional)"
                    style={{ outline: 'none', boxShadow: 'none' }}
                    className="flex-1 bg-[#111113] border border-[#2b2b32] focus:border-[#40404a] rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500"
                  />
                  
                  <input
                    type="file"
                    ref={addFileInputRef}
                    onChange={handleAddFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => addFileInputRef.current?.click()}
                    className="px-3 py-2 bg-[#232328] hover:bg-[#2b2b32] text-xs text-neutral-300 font-medium rounded-xl border border-[#31313a] flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                    title="Pilih foto dari penyimpanan galeri HP"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload HP</span>
                  </button>
                </div>

                {addImageUrl && (
                  <div className="mt-2.5 flex items-center gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-xl bg-[#111113] border border-[#2b2b32] overflow-hidden flex items-center justify-center shrink-0 ${
                        addIsFullImage ? 'p-0' : 'p-1'
                      }`}
                    >
                      <img
                        src={addImageUrl}
                        alt="Pratinjau"
                        className={
                          addIsFullImage
                            ? "w-full h-full object-cover rounded-xl"
                            : "w-7 h-7 object-contain rounded-lg"
                        }
                      />
                    </div>
                    <span className="text-[11px] text-neutral-400">
                      Pratinjau icon ({addIsFullImage ? 'Mode Gambar Full Aktif' : 'Mode Standar'})
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-[#111113] border border-[#28282e] rounded-xl">
                <div className="flex flex-col pr-2">
                  <span className="text-xs font-medium text-white">
                    Mode Gambar Full
                  </span>
                  <span className="text-[11px] text-[#8e8e93]">
                    Gambar memenuhi seluruh kontainer icon aplikasi tanpa jarak/padding
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={addIsFullImage}
                    onChange={(e) => setAddIsFullImage(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#2a2a30] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              <div>
                <label className="text-xs text-neutral-400 mb-1 block">
                  URL Aplikasi Website *
                </label>
                <input
                  type="text"
                  value={addAppUrl}
                  onChange={(e) => setAddAppUrl(e.target.value)}
                  placeholder="https://website-kamu.com"
                  style={{ outline: 'none', boxShadow: 'none' }}
                  className="w-full bg-[#111113] border border-[#2b2b32] focus:border-[#40404a] rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 bg-white hover:bg-neutral-200 text-black text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Simpan Plugin
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 4. UI MODE: #edit */}
        {isEditMode && (
          <div className="bg-[#18181c] border border-[#27272c] rounded-2xl p-4 mb-4 flex flex-col gap-3 shadow-lg animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#25252a]">
              <span className="text-sm font-medium text-white flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-amber-400" />
                {editingTargetPlugin ? `Edit: ${editingTargetPlugin.name}` : 'Edit Aplikasi'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setEditingTargetPlugin(null);
                }}
                className="text-xs text-neutral-400 hover:text-white cursor-pointer"
              >
                Tutup
              </button>
            </div>

            {editMessage && (
              <div className="text-xs p-2.5 rounded-lg bg-neutral-900 border border-[#2e2e36] text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                {editMessage}
              </div>
            )}

            {!editingTargetPlugin ? (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-neutral-400 mb-1.5 block">
                    Nama Aplikasi yang Ingin Diedit
                  </label>
                  <input
                    type="text"
                    value={editSearchName}
                    onChange={(e) => setEditSearchName(e.target.value)}
                    placeholder="Ketik nama aplikasi..."
                    style={{ outline: 'none', boxShadow: 'none' }}
                    className="w-full bg-[#111113] border border-[#2b2b32] focus:border-[#40404a] rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] text-neutral-500 w-full">
                    Pilih aplikasi untuk diedit:
                  </span>
                  {plugins.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleStartEditing(p)}
                      className="text-xs bg-[#202024] hover:bg-[#28282e] text-neutral-300 px-2.5 py-1 rounded-lg border border-[#2a2a30] transition-colors cursor-pointer"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const found = plugins.find(
                        (p) => p.name.toLowerCase() === editSearchName.trim().toLowerCase()
                      );
                      if (found) {
                        handleStartEditing(found);
                      } else {
                        setEditMessage(`Aplikasi "${editSearchName}" tidak ditemukan.`);
                      }
                    }}
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-neutral-400 mb-1 block">
                    Nama Aplikasi *
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Contoh: Portfolio Saya, Toko Online..."
                    style={{ outline: 'none', boxShadow: 'none' }}
                    className="w-full bg-[#111113] border border-[#2b2b32] focus:border-[#40404a] rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 mb-1 block">
                    Deskripsi Aplikasi (Maksimal 1 baris)
                  </label>
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Keterangan singkat tentang aplikasi..."
                    style={{ outline: 'none', boxShadow: 'none' }}
                    className="w-full bg-[#111113] border border-[#2b2b32] focus:border-[#40404a] rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 mb-1 block">
                    Icon / Gambar Aplikasi (URL atau Dari Penyimpanan HP)
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={editImageUrl}
                      onChange={(e) => setEditImageUrl(e.target.value)}
                      placeholder="Masukkan URL gambar icon (opsional)"
                      style={{ outline: 'none', boxShadow: 'none' }}
                      className="flex-1 bg-[#111113] border border-[#2b2b32] focus:border-[#40404a] rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500"
                    />
                    
                    <input
                      type="file"
                      ref={editFileInputRef}
                      onChange={handleEditFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => editFileInputRef.current?.click()}
                      className="px-3 py-2 bg-[#232328] hover:bg-[#2b2b32] text-xs text-neutral-300 font-medium rounded-xl border border-[#31313a] flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                      title="Pilih foto dari penyimpanan galeri HP"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload HP</span>
                    </button>
                  </div>

                  {editImageUrl && (
                    <div className="mt-2.5 flex items-center gap-2.5">
                      <div
                        className={`w-10 h-10 rounded-xl bg-[#111113] border border-[#2b2b32] overflow-hidden flex items-center justify-center shrink-0 ${
                          editIsFullImage ? 'p-0' : 'p-1'
                        }`}
                      >
                        <img
                          src={editImageUrl}
                          alt="Pratinjau"
                          className={
                            editIsFullImage
                              ? "w-full h-full object-cover rounded-xl"
                              : "w-7 h-7 object-contain rounded-lg"
                          }
                        />
                      </div>
                      <span className="text-[11px] text-neutral-400">
                        Pratinjau icon ({editIsFullImage ? 'Mode Gambar Full Aktif' : 'Mode Standar'})
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-3 bg-[#111113] border border-[#28282e] rounded-xl">
                  <div className="flex flex-col pr-2">
                    <span className="text-xs font-medium text-white">
                      Mode Gambar Full
                    </span>
                    <span className="text-[11px] text-[#8e8e93]">
                      Gambar memenuhi seluruh kontainer icon aplikasi tanpa jarak/padding
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={editIsFullImage}
                      onChange={(e) => setEditIsFullImage(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#2a2a30] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                <div>
                  <label className="text-xs text-neutral-400 mb-1 block">
                    URL Aplikasi Website *
                  </label>
                  <input
                    type="text"
                    value={editAppUrl}
                    onChange={(e) => setEditAppUrl(e.target.value)}
                    placeholder="https://website-kamu.com"
                    style={{ outline: 'none', boxShadow: 'none' }}
                    className="w-full bg-[#111113] border border-[#2b2b32] focus:border-[#40404a] rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingTargetPlugin(null)}
                    className="px-4 py-2 bg-[#222227] hover:bg-[#2b2b32] text-neutral-300 text-xs font-medium rounded-xl transition-colors cursor-pointer"
                  >
                    Ganti Aplikasi
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-white hover:bg-neutral-200 text-black text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 5. TAMPILAN NORMAL: KATEGORI "Aplikasi Terbaru" (1 BARIS GESER) & "Aplikasi Lainnya" */}
        {!isDeleteMode && !isAddMode && !isEditMode && (
          <div className="flex flex-col">
            
            {/* JIKA TIDAK SEDANG SEARCH: TAMPILKAN KATEGORI APLIKASI TERBARU & APLIKASI LAINNYA */}
            {!searchQuery.trim() ? (
              <>
                {/* KATEGORI APLIKASI TERBARU (DI ATAS) */}
                <div className="mb-6">
                  <div className="mb-3">
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Aplikasi Terbaru
                    </h2>
                  </div>

                  {/* 1 BARIS, DAPAT DIGESER KANAN KIRI, UKURAN -5%, JARAK LEBIH RAPAT, TANPA SCROLLBAR */}
                  <div className="flex items-start gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden no-scrollbar pb-1 pt-0.5 -mx-4 px-4 sm:mx-0 sm:px-0">
                    {recentPlugins.map((plugin) => (
                      <div
                        key={`recent-${plugin.id}`}
                        onClick={() => setActiveIframePlugin(plugin)}
                        className="flex flex-col items-center shrink-0 w-[97px] sm:w-[109px] cursor-pointer group select-none"
                      >
                        {/* Gambar aplikasi yang besar */}
                        <div
                          className={`w-[85px] h-[85px] sm:w-[95px] sm:h-[95px] rounded-[20px] bg-[#161619] border border-[#232328] group-hover:border-[#38383f] flex items-center justify-center shrink-0 shadow-sm overflow-hidden mb-2 transition-all ${
                            plugin.imageUrl ? 'p-0' : 'p-2.5'
                          }`}
                        >
                          {renderPluginIcon(plugin, true)}
                        </div>

                        {/* Nama aplikasi di bawahnya */}
                        <span className="text-xs sm:text-sm text-center text-white group-hover:text-neutral-200 truncate w-full tracking-tight px-0.5">
                          {plugin.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* KATEGORI APLIKASI LAINNYA (DI BAWAHNYA) */}
                <div>
                  <div className="mb-2.5">
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Aplikasi Lainnya
                    </h2>
                  </div>

                  <div className="flex flex-col">
                    {otherPlugins.map((plugin) => (
                      <div
                        key={`other-${plugin.id}`}
                        onClick={() => setActiveIframePlugin(plugin)}
                        className="flex items-center justify-between py-3 hover:bg-white/[0.03] px-1 rounded-xl transition-colors cursor-pointer select-none"
                      >
                        {/* Sisi Kiri: Icon dan Teks */}
                        <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-3">
                          <div
                            className={`w-12 h-12 rounded-xl bg-[#161619] border border-[#232328] flex items-center justify-center shrink-0 shadow-sm overflow-hidden ${
                              plugin.imageUrl ? 'p-0' : ''
                            }`}
                          >
                            {renderPluginIcon(plugin, false)}
                          </div>

                          <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                            <span className="text-base font-normal text-white tracking-tight truncate block">
                              {plugin.name}
                            </span>
                            <span className="text-xs text-[#8e8e93] truncate block whitespace-nowrap">
                              {plugin.description}
                            </span>
                          </div>
                        </div>

                        {/* Sisi Kanan: Icon Material Symbol radio_button_unchecked */}
                        <div className="shrink-0 flex items-center justify-center p-1 text-[#8e8e93] pointer-events-none">
                          <span className="material-symbols-outlined text-[24px] select-none text-[#8e8e93]">
                            radio_button_unchecked
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* JIKA SEDANG SEARCH: TAMPILKAN HASIL FILTER */
              <div>
                <div className="mb-2.5">
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Hasil Pencarian
                  </h2>
                </div>

                <div className="flex flex-col">
                  {filteredPlugins.map((plugin) => (
                    <div
                      key={plugin.id}
                      onClick={() => setActiveIframePlugin(plugin)}
                      className="flex items-center justify-between py-3 hover:bg-white/[0.03] px-1 rounded-xl transition-colors cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-[#161619] border border-[#232328] flex items-center justify-center shrink-0 shadow-sm overflow-hidden ${
                            plugin.imageUrl ? 'p-0' : ''
                          }`}
                        >
                          {renderPluginIcon(plugin, false)}
                        </div>

                        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                          <span className="text-base font-normal text-white tracking-tight truncate block">
                            {plugin.name}
                          </span>
                          <span className="text-xs text-[#8e8e93] truncate block whitespace-nowrap">
                            {plugin.description}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center justify-center p-1 text-[#8e8e93] pointer-events-none">
                        <span className="material-symbols-outlined text-[24px] select-none text-[#8e8e93]">
                          radio_button_unchecked
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Jika pencarian normal tidak menemukan hasil */}
        {!isDeleteMode && !isAddMode && !isEditMode && searchQuery.trim() && filteredPlugins.length === 0 && (
          <div className="py-12 text-center text-sm text-[#8e8e93]">
            Tidak ada aplikasi yang cocok dengan &quot;{searchQuery}&quot;
          </div>
        )}


      </div>

      {/* 6. KONTAINER PREVIEW APLIKASI (IFRAME) */}
      {activeIframePlugin && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end transition-opacity duration-200"
        >
          {/* CELA KOSONG SEDIKIT DI PALING ATAS - Klik cela ini untuk menutup */}
          <div
            onClick={() => setActiveIframePlugin(null)}
            className="h-8 sm:h-10 w-full flex items-center justify-center cursor-pointer shrink-0"
            title="Klik area kosong ini untuk menutup"
          />

          {/* KONTAINER UTAMA:
              - Kanan kiri di atas melengkung dikit (rounded-t-xl)
              - Garis abu-abu halus tidak menonjol di bagian atas agar batas kontainer dan celah terlihat
          */}
          <div
            style={{
              transform: `translateY(${sheetTranslateY}px)`,
              transition: sheetTranslateY === 0 ? 'transform 0.2s ease-out' : 'none'
            }}
            className="w-full max-w-4xl mx-auto flex-1 bg-[#111113] border-t border-x border-[#26262a] rounded-t-xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header Handle Geser: kontainer pembatas berwarna #111113 */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="w-full pt-2.5 pb-2 bg-[#111113] flex items-center justify-center shrink-0 select-none cursor-grab active:cursor-grabbing border-b border-[#1c1c20]"
            >
              <div className="w-12 h-1.5 bg-[#4a4a52] rounded-full" />
            </div>

            {/* Isi Kontainer: iframe website dengan background #111113 kosong saat loading */}
            <div className="flex-1 w-full relative bg-[#111113]">
              <iframe
                src={activeIframePlugin.appUrl}
                title={activeIframePlugin.name}
                className="w-full h-full border-0 bg-[#111113]"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
