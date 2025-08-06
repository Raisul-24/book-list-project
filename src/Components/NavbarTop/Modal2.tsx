
const Modal2 = () => {
   return (
      <div>
         <button className="btn btn-ghost my-2 text-sky-500 text-xl"
            onClick={() => {
               const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;
               if (modal) {
                 modal.showModal();
               }
             }}
         >مسند أبي حنيفة رواية الحصكفي</button>

         <dialog id="my_modal_5" className="modal">
            <div className="modal-box md:w-2/3 bg-black text-right text-sm md:text-xl md:pl-12 md:pr-4">
               <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-5 text-sky-500">عن الكتاب</h1>
               <p className="pb-4 text-white">
                  الكتاب: مسند أبي حنيفة رواية الحصكفي<br />
                  المؤلف: أبو حنيفة النعمان بن ثابت بن زوطي بن ماه (ت ١٥٠هـ) <br />
                  تحقيق: عبد الرحمن حسن محمود <br />
                  الناشر: الآداب - مصر <br />
                  [الكتاب مرقم آليا غير موافق للمطبوع]
               </p>
               <div className="modal-action">
                  <form method="dialog">
                     <button className="btn btn-neutral border-2 border-white btn-circle rounded-full absolute right-1 top-1">✕</button>
                  </form>
               </div>
            </div>
         </dialog>
      </div>
   );
};

export default Modal2;
