type Role = 'unassigned' | 'destination-hero' | 'feeling' | 'chloes-take' | 'recommendation' | 'story' | 'do-not-use';
type Priority = '' | 'primary' | 'secondary';
interface Assignment { src: string; role: Role; relatedId: string; priority: Priority; alt: string; notes: string; customStoryLabel?: string }
interface Photo { filename: string; publicPath: string; imageUrl: string; orientation: string }
interface Option { id: string; name: string }
interface CatalogData { destination: string; photos: Photo[]; recommendations: Option[]; feelings: Option[]; stories: Option[]; existingAssignments: Assignment[] }
interface ExportDocument { schemaVersion: 1; destination: 'leiden'; updatedAt: string; assignments: Assignment[] }

const STORAGE_KEY = 'travel-atlas:photo-assignments:leiden:v1';
const EXPORT_KEY = `${STORAGE_KEY}:last-export`;
const dataElement = document.querySelector<HTMLScriptElement>('#photoCatalogData');
if (!dataElement?.textContent) throw new Error('Photo catalog data is unavailable.');
const catalog: CatalogData = JSON.parse(dataElement.textContent);
const photoPaths = new Set(catalog.photos.map(photo => photo.publicPath));
const recommendationIds = new Set(catalog.recommendations.map(item => item.id));
const feelingIds = new Set(catalog.feelings.map(item => item.id));
const storyIds = new Set(catalog.stories.map(item => item.id));
const roleLabels: Record<Role, string> = { 'unassigned': 'Unassigned', 'destination-hero': 'Destination Hero', feeling: 'Feeling Image', 'chloes-take': 'Chloe’s Take', recommendation: 'Recommendation Image', story: 'Story Image', 'do-not-use': 'Do Not Use' };
const publicRoles = new Set<Role>(['destination-hero', 'feeling', 'chloes-take', 'recommendation', 'story']);

const parseStoredAssignments = (): Assignment[] => {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(value) ? value : [];
  } catch { return []; }
};
let assignments = parseStoredAssignments();
let activeIndex = 0;

const dialog = document.querySelector<HTMLDialogElement>('#assignmentDialog')!;
const form = document.querySelector<HTMLFormElement>('#assignmentForm')!;
const roleControl = form.elements.namedItem('role') as HTMLSelectElement;
const relatedControl = form.elements.namedItem('relatedId') as HTMLSelectElement;
const customStoryControl = form.elements.namedItem('customStoryLabel') as HTMLInputElement;
const altControl = form.elements.namedItem('alt') as HTMLTextAreaElement;
const notesControl = form.elements.namedItem('notes') as HTMLTextAreaElement;
const relatedField = document.querySelector<HTMLElement>('#relatedField')!;
const customStoryField = document.querySelector<HTMLElement>('#customStoryField')!;
const priorityField = document.querySelector<HTMLElement>('#priorityField')!;
const cards = [...document.querySelectorAll<HTMLElement>('.photo-catalog-card')];
const controls = {
  search: document.querySelector<HTMLInputElement>('#photoSearch')!,
  orientation: document.querySelector<HTMLSelectElement>('#orientationFilter')!,
  assignment: document.querySelector<HTMLSelectElement>('#assignmentFilter')!,
  role: document.querySelector<HTMLSelectElement>('#roleFilter')!,
  recommendation: document.querySelector<HTMLSelectElement>('#recommendationFilter')!,
  doNotUse: document.querySelector<HTMLSelectElement>('#doNotUseFilter')!,
  sort: document.querySelector<HTMLSelectElement>('#photoSort')!,
};

const getAssignment = (src: string) => assignments.find(item => item.src === src);
const normalizedAssignments = () => [...assignments].sort((a, b) => a.src.localeCompare(b.src)).map(item => ({ ...item, customStoryLabel: item.customStoryLabel || undefined }));
const saveDraft = () => { localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedAssignments())); render(); };
const setMessage = (message: string) => { document.querySelector<HTMLElement>('#actionMessage')!.textContent = message; };

const optionsForRole = (role: Role) => {
  if (role === 'destination-hero' || role === 'chloes-take') return [{ id: 'leiden', name: 'Leiden' }];
  if (role === 'feeling') return catalog.feelings;
  if (role === 'recommendation') return catalog.recommendations;
  if (role === 'story') return [...catalog.stories, { id: 'custom', name: 'Custom story label' }];
  return [];
};

const updateRoleFields = (selectedRelated = '') => {
  const role = roleControl.value as Role;
  const options = optionsForRole(role);
  relatedField.hidden = options.length === 0;
  relatedControl.replaceChildren(...options.map(item => new Option(item.name, item.id, false, item.id === selectedRelated)));
  priorityField.hidden = role !== 'recommendation' && role !== 'story';
  customStoryField.hidden = role !== 'story' || relatedControl.value !== 'custom';
  document.querySelector('#altRequirement')!.textContent = publicRoles.has(role) ? 'Required for export' : 'Optional';
};

const openEditor = (index: number) => {
  activeIndex = (index + catalog.photos.length) % catalog.photos.length;
  const photo = catalog.photos[activeIndex];
  const assignment = getAssignment(photo.publicPath);
  document.querySelector<HTMLElement>('#editorTitle')!.textContent = photo.filename;
  const preview = document.querySelector<HTMLImageElement>('#editorPreview')!;
  preview.src = photo.imageUrl; preview.alt = `Large catalog preview of ${photo.filename}`;
  document.querySelector<HTMLElement>('#previewPosition')!.textContent = `${activeIndex + 1} of ${catalog.photos.length}`;
  roleControl.value = assignment?.role ?? 'unassigned';
  updateRoleFields(assignment?.relatedId ?? '');
  customStoryControl.value = assignment?.customStoryLabel ?? '';
  altControl.value = assignment?.alt ?? '';
  notesControl.value = assignment?.notes ?? '';
  const priority = assignment?.priority || ((roleControl.value === 'recommendation' || roleControl.value === 'story') ? 'primary' : '');
  form.querySelectorAll<HTMLInputElement>('input[name="priority"]').forEach(input => { input.checked = input.value === priority; });
  document.querySelector<HTMLButtonElement>('#removeAssignment')!.hidden = !assignment;
  if (!dialog.open) dialog.showModal();
};

const validate = (items: Assignment[]) => {
  const errors: string[] = [];
  const count = (role: Role) => items.filter(item => item.role === role).length;
  if (count('destination-hero') > 1) errors.push('More than one Leiden destination hero is assigned.');
  if (count('chloes-take') > 1) errors.push('More than one Leiden Chloe’s Take image is assigned.');
  const primaryRecommendations = new Set<string>();
  items.forEach(item => {
    if (!photoPaths.has(item.src)) errors.push(`Missing image file: ${item.src}`);
    if (publicRoles.has(item.role) && !item.alt.trim()) errors.push(`${item.src} needs alt text.`);
    if (item.role === 'recommendation' && !recommendationIds.has(item.relatedId)) errors.push(`${item.src} references an invalid recommendation ID.`);
    if (item.role === 'feeling' && !feelingIds.has(item.relatedId)) errors.push(`${item.src} references an invalid feeling slug.`);
    if (item.role === 'story' && item.relatedId !== 'custom' && !storyIds.has(item.relatedId)) errors.push(`${item.src} references an invalid story ID.`);
    if (item.role === 'story' && item.relatedId === 'custom' && !item.customStoryLabel?.trim()) errors.push(`${item.src} needs a custom story label.`);
    if (item.role === 'recommendation' && item.priority === 'primary') {
      if (primaryRecommendations.has(item.relatedId)) errors.push(`More than one primary image is assigned to recommendation ${item.relatedId}.`);
      primaryRecommendations.add(item.relatedId);
    }
    if ((item.role === 'recommendation' || item.role === 'story') && !['primary', 'secondary'].includes(item.priority)) errors.push(`${item.src} needs a primary or secondary priority.`);
  });
  const duplicateSources = items.map(item => item.src).filter((src, index, all) => all.indexOf(src) !== index);
  if (duplicateSources.length) errors.push(`Contradictory assignments exist for: ${[...new Set(duplicateSources)].join(', ')}.`);
  return [...new Set(errors)];
};

const updateCatalog = () => {
  const direction = controls.sort.value === 'descending' ? -1 : 1;
  let visible = 0;
  cards.sort((a, b) => (a.dataset.filename ?? '').localeCompare(b.dataset.filename ?? '', 'en', { numeric: true, sensitivity: 'base' }) * direction).forEach(card => {
    const assignment = getAssignment(card.dataset.src ?? '');
    const matches = (card.dataset.filename ?? '').includes(controls.search.value.trim().toLowerCase())
      && (controls.orientation.value === 'all' || card.dataset.orientation === controls.orientation.value)
      && (controls.assignment.value === 'all' || (controls.assignment.value === 'assigned') === Boolean(assignment))
      && (controls.role.value === 'all' || assignment?.role === controls.role.value)
      && (controls.recommendation.value === 'all' || (assignment?.role === 'recommendation' && assignment.relatedId === controls.recommendation.value))
      && (controls.doNotUse.value === 'all' || (controls.doNotUse.value === 'only') === (assignment?.role === 'do-not-use'));
    card.hidden = !matches;
    if (matches) visible += 1;
    document.querySelector('#photoGrid')!.append(card);
  });
  document.querySelector('#photoCount')!.textContent = `Showing ${visible} photo${visible === 1 ? '' : 's'}.`;
  document.querySelector<HTMLElement>('#emptyLibrary')!.hidden = visible !== 0;
};

const render = () => {
  const errors = validate(assignments);
  cards.forEach(card => {
    const assignment = getAssignment(card.dataset.src ?? '');
    card.classList.toggle('assigned', Boolean(assignment));
    card.classList.toggle('do-not-use', assignment?.role === 'do-not-use');
    card.querySelector<HTMLElement>('.assignment-badge')!.textContent = assignment ? roleLabels[assignment.role] : 'Unassigned';
    const related = assignment ? [...catalog.recommendations, ...catalog.feelings, ...catalog.stories].find(item => item.id === assignment.relatedId)?.name : '';
    card.querySelector<HTMLElement>('.assignment-detail')!.textContent = assignment ? [related || assignment.customStoryLabel, assignment.priority].filter(Boolean).join(' · ') || 'Assigned' : 'Select to assign a role.';
  });
  const assigned = assignments.length;
  const primaryIds = new Set(assignments.filter(item => item.role === 'recommendation' && item.priority === 'primary').map(item => item.relatedId));
  const summary: Record<string, string | number> = {
    total: catalog.photos.length, assigned, unassigned: catalog.photos.length - assigned,
    'do-not-use': assignments.filter(item => item.role === 'do-not-use').length,
    hero: assignments.some(item => item.role === 'destination-hero') ? 'Selected' : 'Missing',
    take: assignments.some(item => item.role === 'chloes-take') ? 'Selected' : 'Missing',
    feelings: assignments.filter(item => item.role === 'feeling').length,
    'recommendation-primary': primaryIds.size,
    'recommendation-missing': catalog.recommendations.length - primaryIds.size,
    stories: assignments.filter(item => item.role === 'story').length,
    errors: errors.length,
  };
  Object.entries(summary).forEach(([key, value]) => { document.querySelector<HTMLElement>(`[data-summary="${key}"]`)!.textContent = String(value); });
  document.querySelector('.validation-summary')?.classList.toggle('has-errors', errors.length > 0);
  const errorPanel = document.querySelector<HTMLElement>('#validationErrors')!;
  errorPanel.hidden = errors.length === 0;
  errorPanel.innerHTML = errors.length ? `<strong>Resolve before export:</strong><ul>${errors.map(error => `<li>${error.replaceAll('&', '&amp;').replaceAll('<', '&lt;')}</li>`).join('')}</ul>` : '';
  const snapshot = localStorage.getItem(EXPORT_KEY);
  const changed = snapshot !== JSON.stringify(normalizedAssignments());
  const exportState = document.querySelector<HTMLElement>('#exportState')!;
  exportState.textContent = snapshot === null ? 'No export yet' : changed ? 'Draft changed since export' : 'Matches last export';
  exportState.classList.toggle('changed', changed);
  updateCatalog();
};

cards.forEach((card, index) => {
  card.addEventListener('click', () => openEditor(index));
  card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openEditor(index); } });
});
Object.values(controls).forEach(control => control.addEventListener(control === controls.search ? 'input' : 'change', updateCatalog));
roleControl.addEventListener('change', () => updateRoleFields());
relatedControl.addEventListener('change', () => { customStoryField.hidden = roleControl.value !== 'story' || relatedControl.value !== 'custom'; });
document.querySelector('#closeEditor')!.addEventListener('click', () => dialog.close());
document.querySelector('#previousPhoto')!.addEventListener('click', () => openEditor(activeIndex - 1));
document.querySelector('#nextPhoto')!.addEventListener('click', () => openEditor(activeIndex + 1));
document.addEventListener('keydown', event => {
  if (!dialog.open) return;
  if (event.key === 'Escape') { event.preventDefault(); dialog.close(); return; }
  if (event.key === 'ArrowLeft') { event.preventDefault(); openEditor(activeIndex - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); openEditor(activeIndex + 1); }
});
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
form.addEventListener('submit', event => {
  event.preventDefault();
  const photo = catalog.photos[activeIndex];
  const role = roleControl.value as Role;
  assignments = assignments.filter(item => item.src !== photo.publicPath);
  if (role !== 'unassigned') {
    const priority = form.querySelector<HTMLInputElement>('input[name="priority"]:checked')?.value as Priority ?? '';
    assignments.push({ src: photo.publicPath, role, relatedId: relatedControl.value, priority: (role === 'recommendation' || role === 'story') ? priority : '', alt: altControl.value.trim(), notes: notesControl.value.trim(), customStoryLabel: role === 'story' && relatedControl.value === 'custom' ? customStoryControl.value.trim() : undefined });
  }
  saveDraft(); setMessage(`Saved ${photo.filename}.`); dialog.close();
});
document.querySelector('#removeAssignment')!.addEventListener('click', () => {
  const photo = catalog.photos[activeIndex]; assignments = assignments.filter(item => item.src !== photo.publicPath); saveDraft(); setMessage(`${photo.filename} is now unassigned.`); dialog.close();
});
document.querySelector('#clearDraft')!.addEventListener('click', () => {
  if (!confirm('Clear every Leiden photo assignment in this browser? This cannot be undone.')) return;
  assignments = []; localStorage.removeItem(STORAGE_KEY); render(); setMessage('Draft assignments cleared.');
});
document.querySelector('#importExisting')!.addEventListener('click', () => {
  if (!confirm(`Import ${catalog.existingAssignments.length} existing public assignments into this draft? Existing draft assignments for the same photos will be replaced.`)) return;
  const existingPaths = new Set(catalog.existingAssignments.map(item => item.src));
  assignments = [...assignments.filter(item => !existingPaths.has(item.src)), ...catalog.existingAssignments]; saveDraft(); setMessage(`Imported ${catalog.existingAssignments.length} existing assignments.`);
});
document.querySelector('#exportJson')!.addEventListener('click', () => {
  const errors = validate(assignments);
  if (errors.length) { setMessage(`Export blocked by ${errors.length} validation error${errors.length === 1 ? '' : 's'}.`); render(); return; }
  const documentData: ExportDocument = { schemaVersion: 1, destination: 'leiden', updatedAt: new Date().toISOString(), assignments: normalizedAssignments() };
  const url = URL.createObjectURL(new Blob([JSON.stringify(documentData, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a'); link.href = url; link.download = 'leiden-photo-assignments.json'; link.click(); URL.revokeObjectURL(url);
  localStorage.setItem(EXPORT_KEY, JSON.stringify(normalizedAssignments())); render(); setMessage(`Exported ${assignments.length} assignments.`);
});
document.querySelector<HTMLInputElement>('#importJson')!.addEventListener('change', async event => {
  const input = event.currentTarget as HTMLInputElement; const file = input.files?.[0]; if (!file) return;
  try {
    const imported = JSON.parse(await file.text()) as Partial<ExportDocument>;
    if (imported.schemaVersion !== 1 || imported.destination !== 'leiden' || !Array.isArray(imported.assignments)) throw new Error('Expected schemaVersion 1, destination leiden, and an assignments array.');
    const permittedRoles = new Set(Object.keys(roleLabels));
    if (imported.assignments.some(item => !item || typeof item.src !== 'string' || !permittedRoles.has(item.role))) throw new Error('One or more assignments use an invalid structure or role.');
    const errors = validate(imported.assignments as Assignment[]);
    if (errors.length) throw new Error(errors.join(' '));
    if (!confirm(`Replace the current draft with ${imported.assignments.length} imported assignments?`)) return;
    assignments = imported.assignments as Assignment[]; saveDraft(); setMessage(`Imported ${assignments.length} assignments from JSON.`);
  } catch (error) { setMessage(`Import rejected: ${error instanceof Error ? error.message : 'Invalid JSON file.'}`); }
  finally { input.value = ''; }
});

render();
