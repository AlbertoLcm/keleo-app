import { useEffect, useState } from "react";
import {
  Check,
  Utensils,
  AlignLeft,
  DollarSign,
  Image as ImageIcon,
  Save,
  AlertCircle,
} from "lucide-react";
import {
  Button,
  InputText,
  useLockBodyScroll,
} from "@/modules/shared";
import api from "@/api/axios";
import { useParams } from "react-router";
import type { Category } from "../models/menu.model";

interface NewProductFormProps {
  onCancel: () => void;
  onUpdateProducts: () => void;
  categories: Category[];
  onCategoryAdded: (category: Category) => void;
}

const NewProductForm: React.FC<NewProductFormProps> = ({
  onCancel,
  onUpdateProducts,
  categories,
  onCategoryAdded,
}) => {
  useLockBodyScroll();
  const { restaurantId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    available: true,
    categoryId: "",
    image: "",
  });

  const [uiState, setUiState] = useState({
    isSendingForm: false,
    isSendingCategory: false,
    isAddingCategory: false,
  });

  const [errors, setErrors] = useState<{ form: string[]; category: string[] }>({
    form: [],
    category: [],
  });

  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    if (categories.length > 0 && !formData.categoryId) {
      setFormData((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, formData.categoryId]);

  const handleAddCategory = async () => {
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) return;

    setUiState((prev) => ({ ...prev, isSendingCategory: true }));
    setErrors((prev) => ({ ...prev, category: [] }));

    try {
      const { data } = await api.post<Category>("categories", {
        name: trimmedName,
        restaurantId,
      });

      onCategoryAdded(data);

      setFormData((prev) => ({ ...prev, categoryId: data.id }));
      setNewCategoryName("");
      setUiState((prev) => ({ ...prev, isAddingCategory: false }));
    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al crear categoría";
      setErrors((prev) => ({
        ...prev,
        category: Array.isArray(msg) ? msg : [msg],
      }));
    } finally {
      setUiState((prev) => ({ ...prev, isSendingCategory: false }));
    }
  };

  const handleSendForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryId) {
      setErrors((prev) => ({
        ...prev,
        form: ["Debes seleccionar o crear una categoría para el producto."],
      }));
      return;
    }

    if (!formData.price || isNaN(Number(formData.price))) {
      setErrors((prev) => ({
        ...prev,
        form: ["El precio debe ser un número válido."],
      }));
      return;
    }

    setUiState((prev) => ({ ...prev, isSendingForm: true }));
    setErrors((prev) => ({ ...prev, form: [] }));

    try {
      await api.post("products", {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        available: formData.available,
        restaurantId,
        categoryId: formData.categoryId,
        image: formData.image,
      });
      onUpdateProducts();
      onCancel();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al guardar el producto";
      setErrors((prev) => ({
        ...prev,
        form: Array.isArray(msg) ? msg : [msg],
      }));
    } finally {
      setUiState((prev) => ({ ...prev, isSendingForm: false }));
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSendForm}>
      {errors.form.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl bg-red-50 border-2 border-red-200 p-4 text-red-600 dark:bg-red-900/30 dark:border-red-900/50 text-sm">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            {errors.form.map((err, i) => (
              <p key={i} className="font-medium">
                {err}
              </p>
            ))}
          </div>
        </div>
      )}

      <section className="space-y-5">
        <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          1. Detalles Básicos
        </h3>
        <InputText
          id="nameProduct"
          label="NOMBRE DEL PRODUCTO"
          name="name"
          icon={<Utensils size={20} />}
          placeholder="Ej. Taco al pastor"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
        
        <InputText
          id="descProduct"
          label="DESCRIPCIÓN"
          name="description"
          icon={<AlignLeft size={20} />}
          placeholder="Ej. Delicioso taco de carne..."
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          required
        />

        <div className="flex gap-4">
          <div className="flex-1">
            <InputText
              id="priceProduct"
              label="PRECIO"
              name="price"
              type="number"
              min="0"
              step="0.01"
              icon={<DollarSign size={20} />}
              placeholder="0.00"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: e.target.value }))
              }
              required
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <label className="text-xs font-bold text-gray-500 ml-1 dark:text-gray-400 mb-2">
              DISPONIBILIDAD
            </label>
            <div className="flex items-center gap-3">
              <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="available"
                  id="availableToggle"
                  className={`toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 transition-all duration-300 ${
                    formData.available ? "right-0 border-keleo-600" : "right-5"
                  }`}
                  checked={formData.available}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, available: e.target.checked }))
                  }
                />
                <label
                  htmlFor="availableToggle"
                  className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${
                    formData.available ? "bg-keleo-600" : "bg-gray-300"
                  }`}
                ></label>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {formData.available ? "Disponible" : "Agotado"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider">
            2. Categoría
          </h3>
          <button
            type="button"
            onClick={() => {
              setUiState((p) => ({ ...p, isAddingCategory: !p.isAddingCategory }));
              setErrors((p) => ({ ...p, category: [] }));
            }}
            className="text-xs font-bold text-keleo-600 hover:underline px-2 py-1 rounded-md hover:bg-keleo-50 dark:hover:bg-keleo-900/20 transition-colors"
          >
            {uiState.isAddingCategory ? "Cancelar" : "+ Nueva Categoría"}
          </button>
        </div>

        {uiState.isAddingCategory ? (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex gap-2">
              <div className="flex-1">
                <InputText
                  id="nameCategory"
                  autoFocus
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Ej. Tacos, Bebidas..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCategory();
                    }
                  }}
                />
              </div>

              <Button
                type="button"
                onClick={handleAddCategory}
                loading={uiState.isSendingCategory}
                disabled={!newCategoryName.trim()}
                className="px-4"
              >
                <Check size={18} />
              </Button>
            </div>
            {errors.category.map((err, i) => (
              <p key={i} className="text-xs text-red-500 font-medium ml-1">
                {err}
              </p>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            No hay categorías registradas. Crea una nueva para continuar.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, categoryId: category.id }))
                }
                className={`py-2.5 px-4 rounded-xl border text-sm font-bold transition-all truncate ${
                  formData.categoryId === category.id
                    ? "bg-keleo-600 border-keleo-600 text-white shadow-md shadow-keleo-600/20"
                    : "bg-transparent border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-keleo-400 hover:text-keleo-600 dark:hover:text-keleo-400"
                }`}
              >
                {category.name || "Sin nombre"}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-5">
        <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          3. Imagen
        </h3>
        <InputText
          id="imageProduct"
          label="URL DE LA IMAGEN (OPCIONAL)"
          name="image"
          icon={<ImageIcon size={20} />}
          placeholder="https://ejemplo.com/imagen.jpg"
          value={formData.image}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, image: e.target.value }))
          }
        />
        {formData.image && (
          <div className="mt-2 h-32 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <img 
              src={formData.image} 
              alt="Preview" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400";
              }}
            />
          </div>
        )}
      </section>

      <div className="pt-8 flex gap-3 sticky bottom-0 bg-white dark:bg-gray-900 pb-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
          className="w-1/3"
        >
          Cancelar
        </Button>
        <Button type="submit" className="w-2/3" loading={uiState.isSendingForm}>
          <Save size={20} className="mr-2" /> Guardar Producto
        </Button>
      </div>
    </form>
  );
};

export default NewProductForm;
