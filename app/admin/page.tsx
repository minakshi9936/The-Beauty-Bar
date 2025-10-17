'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus } from 'lucide-react';

type Category = { id: string; name: string };
type Service = { id: string; name: string; description: string; price: number; image_url: string; category_id?: string };
type Product = { id: string; name: string; description: string; price: number; image_url: string; category_id?: string };
type SliderImage = { id: string; image_url: string; title?: string; order_index: number };
type GalleryImage = { id: string; image_url: string; order_index: number };

export default function AdminDashboard() {
  const { user: profile, loading } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Hair' },
    { id: '2', name: 'Skin' },
    { id: '3', name: 'Nails' },
  ]);

  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'Haircut', description: 'Stylish haircut', price: 500, image_url: '/haircut.jpg', category_id: '1' },
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Shampoo', description: 'Hair care', price: 300, image_url: '/shampoo.jpg', category_id: '1' },
  ]);

  const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showSliderDialog, setShowSliderDialog] = useState(false);
  const [showGalleryDialog, setShowGalleryDialog] = useState(false);

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingSlider, setEditingSlider] = useState<SliderImage | null>(null);
  const [editingGallery, setEditingGallery] = useState<GalleryImage | null>(null);

  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceImageUrl, setServiceImageUrl] = useState('');
  const [serviceCategoryId, setServiceCategoryId] = useState('');

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');

  const [sliderImageUrl, setSliderImageUrl] = useState('');
  const [sliderTitle, setSliderTitle] = useState('');
  const [sliderOrderIndex, setSliderOrderIndex] = useState('');

  const [galleryImageUrl, setGalleryImageUrl] = useState('');
  const [galleryOrderIndex, setGalleryOrderIndex] = useState('');

  useEffect(() => {
    if (!profile) return;
    if (profile.role !== 'admin') router.push('/');
  }, [profile, router]);

  if (!profile || profile.role !== 'admin') return null;

  // ------------------------ Service Handlers ------------------------
  const handleAddService = () => {
    setEditingService(null); setServiceName(''); setServiceDescription(''); setServicePrice(''); setServiceImageUrl(''); setServiceCategoryId(''); setShowServiceDialog(true);
  };
  const handleEditService = (service: Service) => {
    setEditingService(service); setServiceName(service.name)
