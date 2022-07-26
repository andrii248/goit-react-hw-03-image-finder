import css from './Loader.module.css';

export default function Loader() {
   return (
      <div className={css.BoxLoader1}>
         <div className={css.BoxLoader2}>
            <h2 className={css.Loader} data-text="Loading...">
               Loading...
            </h2>
         </div>
      </div>
   );
}
