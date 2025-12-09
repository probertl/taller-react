import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLimit } from "../store/productesSlice";
import { getProductes } from "../store/thunks";

export default function ProductMenu() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      limit: "1000"
    }
  });

  const onSubmit = (data) => {
    const limitValue = parseInt(data.limit);
    dispatch(setLimit(limitValue));
    dispatch(getProductes());
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3 align-items-start">
        <div className="col-auto">
          <label htmlFor="limit" className="form-label">Límit de productes:</label>
          <input
            type="text"
            id="limit"
            className={`form-control ${errors.limit ? 'is-invalid' : ''}`}
            {...register("limit", {
              required: "El camp és requerit",
              pattern: {
                value: /^[1-9]\d*$/,
                message: "Ha de ser un número enter positiu"
              }
            })}
          />
          {errors.limit && (
            <div className="invalid-feedback">
              {errors.limit.message}
            </div>
          )}
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary" style={{ marginTop: "32px" }}>
            Load
          </button>
        </div>
      </form>
    </div>
  );
}
