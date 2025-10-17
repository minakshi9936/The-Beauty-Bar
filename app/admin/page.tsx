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

  // ------------------------ Dummy Data ------------------------
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

  // ------------------------ Dialog States ------------------------
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showSliderDialog, setShowSliderDialog] = useState(false);
  const [showGalleryDialog, setShowGalleryDialog] = useState(false);

  // ------------------------ Editing States ------------------------
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingSlider, setEditingSlider] = useState<SliderImage | null>(null);
  const [editingGallery, setEditingGallery] = useState<GalleryImage | null>(null);

  // ------------------------ Form States ------------------------
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

  // ------------------------ Auth Check ------------------------
  useEffect(() => {
    if (!loading && (!profile || profile.role !== 'admin')) {
      router.push('/');
    }
  }, [profile, loading, router]);

  if (!profile || profile.role !== 'admin') return null;

  // ======================== Handlers ========================

  // ------------------------ Services ------------------------
  const handleAddService = () => {
    setEditingService(null);
    setServiceName('');
    setServiceDescription('');
    setServicePrice('');
    setServiceImageUrl('');
    setServiceCategoryId('');
    setShowServiceDialog(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setServiceName(service.name);
    setServiceDescription(service.description);
    setServicePrice(service.price.toString());
    setServiceImageUrl(service.image_url);
    setServiceCategoryId(service.category_id || '');
    setShowServiceDialog(true);
  };

  const handleSaveService = () => {
    if (editingService) {
      setServices((prev) =>
        prev.map((s) => (s.id === editingService.id ? { ...s, name: serviceName, description: serviceDescription, price: parseFloat(servicePrice), image_url: serviceImageUrl, category_id: serviceCategoryId } : s))
      );
      toast.success('Service updated successfully');
    } else {
      setServices((prev) => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          name: serviceName,
          description: serviceDescription,
          price: parseFloat(servicePrice),
          image_url: serviceImageUrl,
          category_id: serviceCategoryId,
        },
      ]);
      toast.success('Service added successfully');
    }
    setShowServiceDialog(false);
  };

  const handleDeleteService = (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    setServices((prev) => prev.filter((s) => s.id !== id));
    toast.success('Service deleted successfully');
  };

  // ------------------------ Products ------------------------
  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductImageUrl('');
    setProductCategoryId('');
    setShowProductDialog(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductName(product.name);
    setProductDescription(product.description);
    setProductPrice(product.price.toString());
    setProductImageUrl(product.image_url);
    setProductCategoryId(product.category_id || '');
    setShowProductDialog(true);
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, name: productName, description: productDescription, price: parseFloat(productPrice), image_url: productImageUrl, category_id: productCategoryId } : p))
      );
      toast.success('Product updated successfully');
    } else {
      setProducts((prev) => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          name: productName,
          description: productDescription,
          price: parseFloat(productPrice),
          image_url: productImageUrl,
          category_id: productCategoryId,
        },
      ]);
      toast.success('Product added successfully');
    }
    setShowProductDialog(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success('Product deleted successfully');
  };

  // ------------------------ Slider ------------------------
  const handleAddSlider = () => {
    setEditingSlider(null);
    setSliderImageUrl('');
    setSliderTitle('');
    setSliderOrderIndex('');
    setShowSliderDialog(true);
  };

  const handleEditSlider = (slider: SliderImage) => {
    setEditingSlider(slider);
    setSliderImageUrl(slider.image_url);
    setSliderTitle(slider.title || '');
    setSliderOrderIndex(slider.order_index.toString());
    setShowSliderDialog(true);
  };

  const handleSaveSlider = () => {
    if (editingSlider) {
      setSliderImages((prev) =>
        prev.map((s) => (s.id === editingSlider.id ? { ...s, image_url: sliderImageUrl, title: sliderTitle, order_index: parseInt(sliderOrderIndex) } : s))
      );
      toast.success('Slider updated successfully');
    } else {
      setSliderImages((prev) => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          image_url: sliderImageUrl,
          title: sliderTitle,
          order_index: parseInt(sliderOrderIndex),
        },
      ]);
      toast.success('Slider added successfully');
    }
    setShowSliderDialog(false);
  };

  const handleDeleteSlider = (id: string) => {
    if (!confirm('Are you sure you want to delete this slider?')) return;
    setSliderImages((prev) => prev.filter((s) => s.id !== id));
    toast.success('Slider deleted successfully');
  };

  // ------------------------ Gallery ------------------------
  const handleAddGallery = () => {
    setEditingGallery(null);
    setGalleryImageUrl('');
    setGalleryOrderIndex('');
    setShowGalleryDialog(true);
  };

  const handleEditGallery = (gallery: GalleryImage) => {
    setEditingGallery(gallery);
    setGalleryImageUrl(gallery.image_url);
    setGalleryOrderIndex(gallery.order_index.toString());
    setShowGalleryDialog(true);
  };

  const handleSaveGallery = () => {
    if (editingGallery) {
      setGalleryImages((prev) =>
        prev.map((g) => (g.id === editingGallery.id ? { ...g, image_url: galleryImageUrl, order_index: parseInt(galleryOrderIndex) } : g))
      );
      toast.success('Gallery image updated successfully');
    } else {
      setGalleryImages((prev) => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          image_url: galleryImageUrl,
          order_index: parseInt(galleryOrderIndex),
        },
      ]);
      toast.success('Gallery image added successfully');
    }
    setShowGalleryDialog(false);
  };

  const handleDeleteGallery = (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery image?')) return;
    setGalleryImages((prev) => prev.filter((g) => g.id !== id));
    toast.success('Gallery image deleted successfully');
  };

  // ======================== Render ========================
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-pink-100 mt-2">Manage your salon content</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="sliders">Sliders</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          {/* ------------------- Services ------------------- */}
          <TabsContent value="services">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Services Management</CardTitle>
                  <CardDescription>Add, edit, or remove services</CardDescription>
                </div>
                <Button onClick={handleAddService} className="bg-pink-600 hover:bg-pink-700">
                  <Plus className="h-4 w-4 mr-2" /> Add Service
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img src={service.image_url} alt={service.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <h3 className="font-bold">{service.name}</h3>
                        <p>{service.description}</p>
                        <p className="font-semibold">₹{service.price}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handleEditService(service)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteService(service.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ------------------- Products ------------------- */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Products Management</CardTitle>
                  <CardDescription>Add, edit, or remove products</CardDescription>
                </div>
                <Button onClick={handleAddProduct} className="bg-pink-600 hover:bg-pink-700">
                  <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <h3 className="font-bold">{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="font-semibold">₹{product.price}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handleEditProduct(product)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ------------------- Sliders ------------------- */}
          <TabsContent value="sliders">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Slider Management</CardTitle>
                  <CardDescription>Add, edit, or remove sliders</CardDescription>
                </div>
                <Button onClick={handleAddSlider} className="bg-pink-600 hover:bg-pink-700">
                  <Plus className="h-4 w-4 mr-2" /> Add Slider
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {sliderImages.map((slider) => (
                  <div key={slider.id} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                    <img src={slider.image_url} alt={slider.title || 'Slider'} className="w-24 h-16 object-cover rounded" />
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handleEditSlider(slider)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteSlider(slider.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ------------------- Gallery ------------------- */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Gallery Management</CardTitle>
                  <CardDescription>Add, edit, or remove gallery images</CardDescription>
                </div>
                <Button onClick={handleAddGallery} className="bg-pink-600 hover:bg-pink-700">
                  <Plus className="h-4 w-4 mr-2" /> Add Image
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {galleryImages.map((gallery) => (
                  <div key={gallery.id} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                    <img src={gallery.image_url} alt="Gallery" className="w-24 h-16 object-cover rounded" />
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handleEditGallery(gallery)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteGallery(gallery.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ------------------- Dialogs ------------------- */}
      <Dialog open={showServiceDialog} onOpenChange={setShowServiceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Add Service'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
            <Label>Description</Label>
            <Textarea value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} />
            <Label>Price</Label>
            <Input type="number" value={servicePrice} onChange={(e) => setServicePrice(e.target.value)} />
            <Label>Image URL</Label>
            <Input value={serviceImageUrl} onChange={(e) => setServiceImageUrl(e.target.value)} />
            <Label>Category</Label>
            <Select value={serviceCategoryId} onValueChange={setServiceCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="mt-4 w-full" onClick={handleSaveService}>
              {editingService ? 'Update Service' : 'Add Service'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
