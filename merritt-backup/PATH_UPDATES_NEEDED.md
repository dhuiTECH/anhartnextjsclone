Create the Merritt directory:
   next-app/src/app/Merritt/
Copy these from your current Merritt project to next-app/src/app/Merritt/:
app/page.tsx → next-app/src/app/Merritt/page.tsx
app/floorplans/ → next-app/src/app/Merritt/floorplans/
app/neighbourhood/ → next-app/src/app/Merritt/neighbourhood/
app/interiors/ → next-app/src/app/Merritt/interiors/
app/contact/ → next-app/src/app/Merritt/contact/
app/relocation/ → next-app/src/app/Merritt/relocation/
app/admin/ → next-app/src/app/Merritt/admin/
Copy shared components:
app/components/ → next-app/src/app/components/ (merge with existing)
Copy public assets:
Merritt-specific images/assets → next-app/public/
Update all internal links:
Change /floorplans → /Merritt/floorplans
Change /neighbourhood → /Merritt/neighbourhood
etc.
The key difference: use next-app/src/app/Merritt/ instead of next-app/app/Merritt/.
Want help identifying which files need link updates, or a script to automate the path changes?