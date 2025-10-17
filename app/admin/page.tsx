'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Service, Product, SliderImage, GalleryImage, Category } from '@/lib/supabase';
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

export default function AdminDashboard() {
  const { profile, loading } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
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
    if (!loading && (!profile || profile.role !== 'admin')) {
      router.push('/');
    }
  }, [profile, loading, router]);

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchData();
    }
  }, [profile]);

  const fetchData = async () => {
    const [categoriesData, servicesData, productsData, slidersData, galleryData] = await Promise.all([
      supabase.from('categories').select('*'),
      supabase.from('services').select('*').order('created_at', { ascending: false }),
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('slider_images').select('*').order('order_index'),
      supabase.from('gallery_images').select('*').order('order_index'),
    ]);

    if (categoriesData.data) setCategories(categoriesData.data);
    if (servicesData.data) setServices(servicesData.data);
    if (productsData.data) setProducts(productsData.data);
    if (slidersData.data) setSliderImages(slidersData.data);
    if (galleryData.data) setGalleryImages(galleryData.data);
  };

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

  const handleSaveService = async () => {
    try {
      const serviceData = {
        name: serviceName,
        description: serviceDescription,
        price: parseFloat(servicePrice),
        image_url: serviceImageUrl,
        category_id: serviceCategoryId,
      };

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);
        if (error) throw error;
        toast.success('Service updated successfully');
      } else {
        const { error } = await supabase.from('services').insert([serviceData]);
        if (error) throw error;
        toast.success('Service added successfully');
      }

      setShowServiceDialog(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to save service');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      toast.success('Service deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

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

  const handleSaveProduct = async () => {
    try {
      const productData = {
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
        image_url: productImageUrl,
        category_id: productCategoryId,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        if (error) throw error;
        toast.success('Product updated successfully');
      } else {
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
        toast.success('Product added successfully');
      }

      setShowProductDialog(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      toast.success('Product deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

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

  const handleSaveSlider = async () => {
    try {
      const sliderData = {
        image_url: sliderImageUrl,
        title: sliderTitle,
        order_index: parseInt(sliderOrderIndex),
      };

      if (editingSlider) {
        const { error } = await supabase
          .from('slider_images')
          .update(sliderData)
          .eq('id', editingSlider.id);
        if (error) throw error;
        toast.success('Slider updated successfully');
      } else {
        const { error } = await supabase.from('slider_images').insert([sliderData]);
        if (error) throw error;
        toast.success('Slider added successfully');
      }

      setShowSliderDialog(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to save slider');
    }
  };

  const handleDeleteSlider = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slider?')) return;

    try {
      const { error } = await supabase.from('slider_images').delete().eq('id', id);
      if (error) throw error;
      toast.success('Slider deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete slider');
    }
  };

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

  const handleSaveGallery = async () => {
    try {
      const galleryData = {
        image_url: galleryImageUrl,
        order_index: parseInt(galleryOrderIndex),
      };

      if (editingGallery) {
        const { error } = await supabase
          .from('gallery_images')
          .update(galleryData)
          .eq('id', editingGallery.id);
        if (error) throw error;
        toast.success('Gallery image updated successfully');
      } else {
        const { error } = await supabase.from('gallery_images').insert([galleryData]);
        if (error) throw error;
        toast.success('Gallery image added successfully');
      }

      setShowGalleryDialog(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to save gallery image');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery image?')) return;

    try {
      const { error } = await supabase.from('gallery_images').delete().eq('id', id);
      if (error) throw error;
      toast.success('Gallery image deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete gallery image');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!profile || profile.role !== 'admin') {
    return null;
  }

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

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Services Management</CardTitle>
                    <CardDescription>Add, edit, or remove services</CardDescription>
                  </div>
                  <Button onClick={handleAddService} className="bg-pink-600 hover:bg-pink-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 bg-white border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={service.image_url}
                          alt={service.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold text-black">{service.name}</h3>
                          <p className="text-sm text-gray-600">${service.price}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditService(service)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Products Management</CardTitle>
                    <CardDescription>Add, edit, or remove products</CardDescription>
                  </div>
                  <Button onClick={handleAddProduct} className="bg-pink-600 hover:bg-pink-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 bg-white border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold text-black">{product.name}</h3>
                          <p className="text-sm text-gray-600">${product.price}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sliders">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Slider Management</CardTitle>
                    <CardDescription>Add, edit, or remove slider images</CardDescription>
                  </div>
                  <Button onClick={handleAddSlider} className="bg-pink-600 hover:bg-pink-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slider
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sliderImages.map((slider) => (
                    <div
                      key={slider.id}
                      className="flex items-center justify-between p-4 bg-white border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={slider.image_url}
                          alt={slider.title || 'Slider'}
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold text-black">
                            {slider.title || 'No title'}
                          </h3>
                          <p className="text-sm text-gray-600">Order: {slider.order_index}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditSlider(slider)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteSlider(slider.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Gallery Management</CardTitle>
                    <CardDescription>Add, edit, or remove gallery images</CardDescription>
                  </div>
                  <Button onClick={handleAddGallery} className="bg-pink-600 hover:bg-pink-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.image_url}
                        alt="Gallery"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditGallery(image)}
                          className="bg-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteGallery(image.id)}
                          className="bg-white"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showServiceDialog} onOpenChange={setShowServiceDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Add Service'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                value={servicePrice}
                onChange={(e) => setServicePrice(e.target.value)}
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={serviceImageUrl}
                onChange={(e) => setServiceImageUrl(e.target.value)}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={serviceCategoryId} onValueChange={setServiceCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSaveService} className="w-full bg-pink-600 hover:bg-pink-700">
              {editingService ? 'Update Service' : 'Add Service'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={productImageUrl}
                onChange={(e) => setProductImageUrl(e.target.value)}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={productCategoryId} onValueChange={setProductCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSaveProduct} className="w-full bg-pink-600 hover:bg-pink-700">
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSliderDialog} onOpenChange={setShowSliderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSlider ? 'Edit Slider' : 'Add Slider'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Image URL</Label>
              <Input
                value={sliderImageUrl}
                onChange={(e) => setSliderImageUrl(e.target.value)}
              />
            </div>
            <div>
              <Label>Title (Optional)</Label>
              <Input value={sliderTitle} onChange={(e) => setSliderTitle(e.target.value)} />
            </div>
            <div>
              <Label>Order Index</Label>
              <Input
                type="number"
                value={sliderOrderIndex}
                onChange={(e) => setSliderOrderIndex(e.target.value)}
              />
            </div>
            <Button onClick={handleSaveSlider} className="w-full bg-pink-600 hover:bg-pink-700">
              {editingSlider ? 'Update Slider' : 'Add Slider'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showGalleryDialog} onOpenChange={setShowGalleryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingGallery ? 'Edit Gallery Image' : 'Add Gallery Image'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Image URL</Label>
              <Input
                value={galleryImageUrl}
                onChange={(e) => setGalleryImageUrl(e.target.value)}
              />
            </div>
            <div>
              <Label>Order Index</Label>
              <Input
                type="number"
                value={galleryOrderIndex}
                onChange={(e) => setGalleryOrderIndex(e.target.value)}
              />
            </div>
            <Button onClick={handleSaveGallery} className="w-full bg-pink-600 hover:bg-pink-700">
              {editingGallery ? 'Update Image' : 'Add Image'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
