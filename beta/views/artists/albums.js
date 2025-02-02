const html = require('choo/html')
const Albums = require('../../components/albums')
const breadcrump = require('../../elements/breadcrump')

const viewLayout = require('../../elements/view-layout')

module.exports = ArtistAlbumsView

function ArtistAlbumsView () {
  return (state, emit) => {
    state.title = state.title || 'Artists'

    const id = parseInt(state.params.uid, 10)
    if (isNaN(id)) return emit(state.events.PUSHSTATE, '/')

    const albums = state.cache(Albums, 'artist-albums-' + id).render({
      items: state.artist.albums || [],
      pagination: true,
      limit: 5
    })

    return viewLayout((state, emit) => html`
      <section id="artist-profile" class="flex flex-column flex-auto w-100">
        <section id="content" class="flex flex-column flex-auto w-100 pb6 ph3">
          ${breadcrump({ href: `/artists/${id}`, text: 'Back to artist profile' })}
          <section id="artist-albums" class="flex-auto">
            <h2 class="lh-title">Albums</h2>
            ${albums}
          </section>
        </section>
      </section>
    `)(state, emit)
  }
}
