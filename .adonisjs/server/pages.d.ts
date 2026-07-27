import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/profile': ExtractProps<(typeof import('../../inertia/pages/auth/profile.tsx'))['default']>
    'changelog': ExtractProps<(typeof import('../../inertia/pages/changelog.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'errors/unauthorized': ExtractProps<(typeof import('../../inertia/pages/errors/unauthorized.tsx'))['default']>
    'event/components/daily_events_card': ExtractProps<(typeof import('../../inertia/pages/event/components/daily_events_card.tsx'))['default']>
    'event/components/giveaway_card_content': ExtractProps<(typeof import('../../inertia/pages/event/components/giveaway_card_content.tsx'))['default']>
    'event/components/giveaway_prize': ExtractProps<(typeof import('../../inertia/pages/event/components/giveaway_prize.tsx'))['default']>
    'event/components/giveaway_user': ExtractProps<(typeof import('../../inertia/pages/event/components/giveaway_user.tsx'))['default']>
    'event/components/on_your_marks_event_card': ExtractProps<(typeof import('../../inertia/pages/event/components/on_your_marks_event_card.tsx'))['default']>
    'event/components/qdf_event_card': ExtractProps<(typeof import('../../inertia/pages/event/components/qdf_event_card.tsx'))['default']>
    'event/giveaway': ExtractProps<(typeof import('../../inertia/pages/event/giveaway.tsx'))['default']>
    'event/index': ExtractProps<(typeof import('../../inertia/pages/event/index.tsx'))['default']>
    'faq': ExtractProps<(typeof import('../../inertia/pages/faq.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'informations': ExtractProps<(typeof import('../../inertia/pages/informations.tsx'))['default']>
    'know_everything': ExtractProps<(typeof import('../../inertia/pages/know_everything.tsx'))['default']>
    'leaderboard/alliance/index': ExtractProps<(typeof import('../../inertia/pages/leaderboard/alliance/index.tsx'))['default']>
    'leaderboard/boss/index': ExtractProps<(typeof import('../../inertia/pages/leaderboard/boss/index.tsx'))['default']>
    'leaderboard/chorus/index': ExtractProps<(typeof import('../../inertia/pages/leaderboard/chorus/index.tsx'))['default']>
    'leaderboard/clicker/index': ExtractProps<(typeof import('../../inertia/pages/leaderboard/clicker/index.tsx'))['default']>
    'leaderboard/components/graph_tooltip': ExtractProps<(typeof import('../../inertia/pages/leaderboard/components/graph_tooltip.tsx'))['default']>
    'leaderboard/components/pagination': ExtractProps<(typeof import('../../inertia/pages/leaderboard/components/pagination.tsx'))['default']>
    'leaderboard/components/podium_card': ExtractProps<(typeof import('../../inertia/pages/leaderboard/components/podium_card.tsx'))['default']>
    'leaderboard/egghunt/index': ExtractProps<(typeof import('../../inertia/pages/leaderboard/egghunt/index.tsx'))['default']>
    'leaderboard/end/index': ExtractProps<(typeof import('../../inertia/pages/leaderboard/end/index.tsx'))['default']>
    'leaderboard/factions/index': ExtractProps<(typeof import('../../inertia/pages/leaderboard/factions/index.tsx'))['default']>
    'leaderboard/index': ExtractProps<(typeof import('../../inertia/pages/leaderboard/index.tsx'))['default']>
    'leaderboard/jobs/index': ExtractProps<(typeof import('../../inertia/pages/leaderboard/jobs/index.tsx'))['default']>
    'leaderboard/koth/index': ExtractProps<(typeof import('../../inertia/pages/leaderboard/koth/index.tsx'))['default']>
    'leaderboard/money/index': ExtractProps<(typeof import('../../inertia/pages/leaderboard/money/index.tsx'))['default']>
    'leaderboard/stores/use_puzzle_store': ExtractProps<(typeof import('../../inertia/pages/leaderboard/stores/use_puzzle_store.ts'))['default']>
    'leaderboard/trixium/index': ExtractProps<(typeof import('../../inertia/pages/leaderboard/trixium/index.tsx'))['default']>
    'privacy': ExtractProps<(typeof import('../../inertia/pages/privacy.tsx'))['default']>
    'staff/components/api_database_evolution_card': ExtractProps<(typeof import('../../inertia/pages/staff/components/api_database_evolution_card.tsx'))['default']>
    'staff/components/api_latest_players_card': ExtractProps<(typeof import('../../inertia/pages/staff/components/api_latest_players_card.tsx'))['default']>
    'staff/components/api_stats_endpoints_card': ExtractProps<(typeof import('../../inertia/pages/staff/components/api_stats_endpoints_card.tsx'))['default']>
    'staff/components/api_stats_keys_card': ExtractProps<(typeof import('../../inertia/pages/staff/components/api_stats_keys_card.tsx'))['default']>
    'staff/components/discord_evolution_card': ExtractProps<(typeof import('../../inertia/pages/staff/components/discord_evolution_card.tsx'))['default']>
    'staff/components/discord_interactions_card': ExtractProps<(typeof import('../../inertia/pages/staff/components/discord_interactions_card.tsx'))['default']>
    'staff/components/stat_card': ExtractProps<(typeof import('../../inertia/pages/staff/components/stat_card.tsx'))['default']>
    'staff/dashboard/index': ExtractProps<(typeof import('../../inertia/pages/staff/dashboard/index.tsx'))['default']>
    'staff/giveaways/columns': ExtractProps<(typeof import('../../inertia/pages/staff/giveaways/columns.tsx'))['default']>
    'staff/giveaways/data_table': ExtractProps<(typeof import('../../inertia/pages/staff/giveaways/data_table.tsx'))['default']>
    'staff/giveaways/delete_giveaway_dialog': ExtractProps<(typeof import('../../inertia/pages/staff/giveaways/delete_giveaway_dialog.tsx'))['default']>
    'staff/giveaways/giveaway_draw_modal': ExtractProps<(typeof import('../../inertia/pages/staff/giveaways/giveaway_draw_modal.tsx'))['default']>
    'staff/giveaways/giveaway_modal': ExtractProps<(typeof import('../../inertia/pages/staff/giveaways/giveaway_modal.tsx'))['default']>
    'staff/giveaways/index': ExtractProps<(typeof import('../../inertia/pages/staff/giveaways/index.tsx'))['default']>
    'staff/giveaways/remove_user_giveaway_dialog': ExtractProps<(typeof import('../../inertia/pages/staff/giveaways/remove_user_giveaway_dialog.tsx'))['default']>
    'staff/roles/columns': ExtractProps<(typeof import('../../inertia/pages/staff/roles/columns.tsx'))['default']>
    'staff/roles/data_table': ExtractProps<(typeof import('../../inertia/pages/staff/roles/data_table.tsx'))['default']>
    'staff/roles/delete_role_dialog': ExtractProps<(typeof import('../../inertia/pages/staff/roles/delete_role_dialog.tsx'))['default']>
    'staff/roles/index': ExtractProps<(typeof import('../../inertia/pages/staff/roles/index.tsx'))['default']>
    'staff/roles/role_modal': ExtractProps<(typeof import('../../inertia/pages/staff/roles/role_modal.tsx'))['default']>
    'staff/users/columns': ExtractProps<(typeof import('../../inertia/pages/staff/users/columns.tsx'))['default']>
    'staff/users/data_table': ExtractProps<(typeof import('../../inertia/pages/staff/users/data_table.tsx'))['default']>
    'staff/users/delete_user_dialog': ExtractProps<(typeof import('../../inertia/pages/staff/users/delete_user_dialog.tsx'))['default']>
    'staff/users/index': ExtractProps<(typeof import('../../inertia/pages/staff/users/index.tsx'))['default']>
    'staff/users/page_settings': ExtractProps<(typeof import('../../inertia/pages/staff/users/page_settings.tsx'))['default']>
    'staff/users/user_modal': ExtractProps<(typeof import('../../inertia/pages/staff/users/user_modal.tsx'))['default']>
    'stats/components/information_line': ExtractProps<(typeof import('../../inertia/pages/stats/components/information_line.tsx'))['default']>
    'stats/factions/components/faction_details': ExtractProps<(typeof import('../../inertia/pages/stats/factions/components/faction_details.tsx'))['default']>
    'stats/factions/components/search_faction_form': ExtractProps<(typeof import('../../inertia/pages/stats/factions/components/search_faction_form.tsx'))['default']>
    'stats/factions/show': ExtractProps<(typeof import('../../inertia/pages/stats/factions/show.tsx'))['default']>
    'stats/players/components/player_details': ExtractProps<(typeof import('../../inertia/pages/stats/players/components/player_details.tsx'))['default']>
    'stats/players/components/search_player_form': ExtractProps<(typeof import('../../inertia/pages/stats/players/components/search_player_form.tsx'))['default']>
    'stats/players/components/wrapped_card': ExtractProps<(typeof import('../../inertia/pages/stats/players/components/wrapped_card.tsx'))['default']>
    'stats/players/components/wrapped_metric_card': ExtractProps<(typeof import('../../inertia/pages/stats/players/components/wrapped_metric_card.tsx'))['default']>
    'stats/players/components/wrapped_metrics': ExtractProps<(typeof import('../../inertia/pages/stats/players/components/wrapped_metrics.tsx'))['default']>
    'stats/players/components/wrapped_personalization': ExtractProps<(typeof import('../../inertia/pages/stats/players/components/wrapped_personalization.tsx'))['default']>
    'stats/players/components/wrapped_settings': ExtractProps<(typeof import('../../inertia/pages/stats/players/components/wrapped_settings.tsx'))['default']>
    'stats/players/show': ExtractProps<(typeof import('../../inertia/pages/stats/players/show.tsx'))['default']>
    'stats/players/wrapped/end': ExtractProps<(typeof import('../../inertia/pages/stats/players/wrapped/end.tsx'))['default']>
    'stats/players/wrapped/index': ExtractProps<(typeof import('../../inertia/pages/stats/players/wrapped/index.tsx'))['default']>
    'status/components/uptime_indicator': ExtractProps<(typeof import('../../inertia/pages/status/components/uptime_indicator.tsx'))['default']>
    'status/paladium/index': ExtractProps<(typeof import('../../inertia/pages/status/paladium/index.tsx'))['default']>
    'status/stores/use_date_interval_store': ExtractProps<(typeof import('../../inertia/pages/status/stores/use_date_interval_store.ts'))['default']>
    'terms': ExtractProps<(typeof import('../../inertia/pages/terms.tsx'))['default']>
    'tools/clicker/components/accent_text': ExtractProps<(typeof import('../../inertia/pages/tools/clicker/components/accent_text.tsx'))['default']>
    'tools/clicker/components/building_card': ExtractProps<(typeof import('../../inertia/pages/tools/clicker/components/building_card.tsx'))['default']>
    'tools/clicker/components/click_card': ExtractProps<(typeof import('../../inertia/pages/tools/clicker/components/click_card.tsx'))['default']>
    'tools/clicker/components/clicker_settings': ExtractProps<(typeof import('../../inertia/pages/tools/clicker/components/clicker_settings.tsx'))['default']>
    'tools/clicker/components/coin_wrapper': ExtractProps<(typeof import('../../inertia/pages/tools/clicker/components/coin_wrapper.tsx'))['default']>
    'tools/clicker/components/next_purchase_card': ExtractProps<(typeof import('../../inertia/pages/tools/clicker/components/next_purchase_card.tsx'))['default']>
    'tools/clicker/components/options_card': ExtractProps<(typeof import('../../inertia/pages/tools/clicker/components/options_card.tsx'))['default']>
    'tools/clicker/components/statistics_card': ExtractProps<(typeof import('../../inertia/pages/tools/clicker/components/statistics_card.tsx'))['default']>
    'tools/clicker/components/upgrade_card': ExtractProps<(typeof import('../../inertia/pages/tools/clicker/components/upgrade_card.tsx'))['default']>
    'tools/clicker/components/upgrade_wrapper': ExtractProps<(typeof import('../../inertia/pages/tools/clicker/components/upgrade_wrapper.tsx'))['default']>
    'tools/clicker/hooks/use_sync_local_store': ExtractProps<(typeof import('../../inertia/pages/tools/clicker/hooks/use_sync_local_store.ts'))['default']>
    'tools/clicker/show': ExtractProps<(typeof import('../../inertia/pages/tools/clicker/show.tsx'))['default']>
    'tools/clicker/stores/player_clicker_store': ExtractProps<(typeof import('../../inertia/pages/tools/clicker/stores/player_clicker_store.ts'))['default']>
    'tools/index': ExtractProps<(typeof import('../../inertia/pages/tools/index.tsx'))['default']>
    'tools/job_calculator/components/calculator_form': ExtractProps<(typeof import('../../inertia/pages/tools/job_calculator/components/calculator_form.tsx'))['default']>
    'tools/job_calculator/components/calculator_result': ExtractProps<(typeof import('../../inertia/pages/tools/job_calculator/components/calculator_result.tsx'))['default']>
    'tools/job_calculator/components/experience_method': ExtractProps<(typeof import('../../inertia/pages/tools/job_calculator/components/experience_method.tsx'))['default']>
    'tools/job_calculator/components/item_contribution': ExtractProps<(typeof import('../../inertia/pages/tools/job_calculator/components/item_contribution.tsx'))['default']>
    'tools/job_calculator/components/job_calculator_instructions': ExtractProps<(typeof import('../../inertia/pages/tools/job_calculator/components/job_calculator_instructions.tsx'))['default']>
    'tools/job_calculator/components/job_calculator_mode_selector': ExtractProps<(typeof import('../../inertia/pages/tools/job_calculator/components/job_calculator_mode_selector.tsx'))['default']>
    'tools/job_calculator/components/job_calculator_wrapper': ExtractProps<(typeof import('../../inertia/pages/tools/job_calculator/components/job_calculator_wrapper.tsx'))['default']>
    'tools/job_calculator/components/job_level_controls': ExtractProps<(typeof import('../../inertia/pages/tools/job_calculator/components/job_level_controls.tsx'))['default']>
    'tools/job_calculator/contents/item': ExtractProps<(typeof import('../../inertia/pages/tools/job_calculator/contents/item.ts'))['default']>
    'tools/job_calculator/index': ExtractProps<(typeof import('../../inertia/pages/tools/job_calculator/index.tsx'))['default']>
    'tools/pog_calculator/components/beta_alert': ExtractProps<(typeof import('../../inertia/pages/tools/pog_calculator/components/beta_alert.tsx'))['default']>
    'tools/pog_calculator/components/calculator_result': ExtractProps<(typeof import('../../inertia/pages/tools/pog_calculator/components/calculator_result.tsx'))['default']>
    'tools/pog_calculator/components/experience_method': ExtractProps<(typeof import('../../inertia/pages/tools/pog_calculator/components/experience_method.tsx'))['default']>
    'tools/pog_calculator/components/pog_level_controls': ExtractProps<(typeof import('../../inertia/pages/tools/pog_calculator/components/pog_level_controls.tsx'))['default']>
    'tools/pog_calculator/index': ExtractProps<(typeof import('../../inertia/pages/tools/pog_calculator/index.tsx'))['default']>
  }
}
