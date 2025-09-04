// import { createStock, getAllLocations, getAllProducts, NewStockPayload } from "@/lib/redux/actions/stockActions";
import { getAllproducts } from "@/lib/redux/actions/productsAction";
import { NewStockPayload } from "@/lib/redux/actions/stockAction";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

export default function AddStockModal({ isOpen, onClose, onAddSuccess }: AddStockModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.stock.products);
console.log("Products in AddStockModal:", products);
  const [productId, setProductId] = useState("");
//   const [locationId, setLocationId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [minStockLevel, setMinStockLevel] = useState(0);
  const [maxStockLevel, setMaxStockLevel] = useState(0);
  const [reorderLevel, setReorderLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      dispatch(getAllproducts());
    //   dispatch(getAllLocations());
    }
  }, [isOpen, dispatch]);

  const handleSave = async () => {
    if (!productId) {
      setError("Product is required.");
      return;
    }
    setError(null);
    const payload: NewStockPayload = { productId, quantity, minStockLevel, maxStockLevel, reorderLevel };

    try {
      await dispatch(createStock(payload)).unwrap();
      onAddSuccess();
      onClose();
    } catch (err: any) {
      const errorMessage = err?.error || "Failed to add stock. This product may already have a stock record at this location.";
      setError(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Add New Stock</h5><button type="button" className="btn-close" onClick={onClose} /></div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label className="form-label">Product</label>
              <select className="form-select" value={productId} onChange={(e) => setProductId(e.target.value)}>
                <option value="">Select a Product</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            {/* <div className="mb-3">
              <label className="form-label">Location</label>
              <select className="form-select" value={locationId} onChange={(e) => setLocationId(e.target.value)}>
                <option value="">Select a Location</option>
                {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div> */}
            <div className="mb-3"><label className="form-label">Quantity</label><input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} /></div>
            <div className="mb-3"><label className="form-label">Min Stock Level</label><input type="number" className="form-control" value={minStockLevel} onChange={(e) => setMinStockLevel(Number(e.target.value))} /></div>
            <div className="mb-3"><label className="form-label">Max Stock Level</label><input type="number" className="form-control" value={maxStockLevel} onChange={(e) => setMaxStockLevel(Number(e.target.value))} /></div>
            <div className="mb-3"><label className="form-label">Re-order Level</label><input type="number" className="form-control" value={reorderLevel} onChange={(e) => setReorderLevel(Number(e.target.value))} /></div>
          </div>
          <div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button><button type="button" className="btn btn-primary" onClick={handleSave}>Add Stock</button></div>
        </div>
      </div>
    </div>
  );
}

function createStock(payload: NewStockPayload): any {
    throw new Error("Function not implemented.");
}
