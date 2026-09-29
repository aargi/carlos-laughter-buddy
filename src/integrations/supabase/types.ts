export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      app_user_connections: {
        Row: {
          connection_key_ciphertext: string
          connector_id: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          connection_key_ciphertext: string
          connector_id: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          connection_key_ciphertext?: string
          connector_id?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      slack_deliveries: {
        Row: {
          attempts: number
          claimed_at: string | null
          created_at: string
          events_purged: boolean
          expires_at: string
          finishes: number
          id: string
          is_test: boolean
          last_error: string | null
          launch_token: string
          next_attempt_at: string
          opens: number
          slack_ts: string | null
          slot_at: string
          starts: number
          status: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          attempts?: number
          claimed_at?: string | null
          created_at?: string
          events_purged?: boolean
          expires_at: string
          finishes?: number
          id?: string
          is_test?: boolean
          last_error?: string | null
          launch_token: string
          next_attempt_at?: string
          opens?: number
          slack_ts?: string | null
          slot_at: string
          starts?: number
          status?: string
          updated_at?: string
          workspace_id: string
        }
        Update: {
          attempts?: number
          claimed_at?: string | null
          created_at?: string
          events_purged?: boolean
          expires_at?: string
          finishes?: number
          id?: string
          is_test?: boolean
          last_error?: string | null
          launch_token?: string
          next_attempt_at?: string
          opens?: number
          slack_ts?: string | null
          slot_at?: string
          starts?: number
          status?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "slack_deliveries_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "slack_workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      slack_events: {
        Row: {
          browser_id: string
          created_at: string
          delivery_id: string
          id: number
          kind: string
        }
        Insert: {
          browser_id: string
          created_at?: string
          delivery_id: string
          id?: number
          kind: string
        }
        Update: {
          browser_id?: string
          created_at?: string
          delivery_id?: string
          id?: number
          kind?: string
        }
        Relationships: [
          {
            foreignKeyName: "slack_events_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "slack_deliveries"
            referencedColumns: ["id"]
          },
        ]
      }
      slack_scheduler_state: {
        Row: {
          id: number
          last_run: string
        }
        Insert: {
          id?: number
          last_run?: string
        }
        Update: {
          id?: number
          last_run?: string
        }
        Relationships: []
      }
      slack_workspace_members: {
        Row: {
          created_at: string
          role: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          role?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          role?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "slack_workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "slack_workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      slack_workspaces: {
        Row: {
          active: boolean
          channel_id: string | null
          channel_name: string | null
          created_at: string
          days: number[]
          id: string
          last_scheduler_run: string | null
          orphaned_at: string | null
          owner_user_id: string | null
          post_time: string
          reconnect_required: boolean
          team_id: string
          team_name: string | null
          timezone: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          channel_id?: string | null
          channel_name?: string | null
          created_at?: string
          days?: number[]
          id?: string
          last_scheduler_run?: string | null
          orphaned_at?: string | null
          owner_user_id?: string | null
          post_time?: string
          reconnect_required?: boolean
          team_id: string
          team_name?: string | null
          timezone?: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          channel_id?: string | null
          channel_name?: string | null
          created_at?: string
          days?: number[]
          id?: string
          last_scheduler_run?: string | null
          orphaned_at?: string | null
          owner_user_id?: string | null
          post_time?: string
          reconnect_required?: boolean
          team_id?: string
          team_name?: string | null
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          interest: string
          team_size: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          interest: string
          team_size?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          interest?: string
          team_size?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_slack_deliveries: {
        Args: { _limit: number }
        Returns: {
          attempts: number
          claimed_at: string | null
          created_at: string
          events_purged: boolean
          expires_at: string
          finishes: number
          id: string
          is_test: boolean
          last_error: string | null
          launch_token: string
          next_attempt_at: string
          opens: number
          slack_ts: string | null
          slot_at: string
          starts: number
          status: string
          updated_at: string
          workspace_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "slack_deliveries"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      is_slack_admin: {
        Args: { _user_id: string; _workspace_id: string }
        Returns: boolean
      }
      purge_expired_slack_events: { Args: never; Returns: number }
      slack_scheduler_try_start: { Args: never; Returns: boolean }
      slack_stats: {
        Args: { _days: number; _workspace_id: string }
        Returns: {
          finishes: number
          opens: number
          sent: number
          starts: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
